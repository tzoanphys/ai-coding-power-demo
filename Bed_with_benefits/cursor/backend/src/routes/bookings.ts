import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { requireAuth, type AuthRequest } from '../middleware/auth.js';

const prisma = new PrismaClient();
export const bookingsRouter = Router();

const bookingSchema = z.object({
  listingId: z.string().uuid(),
  checkIn: z.string().datetime(),
  checkOut: z.string().datetime()
});

bookingsRouter.post('/', requireAuth, async (req: AuthRequest, res) => {
  const parsed = bookingSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid payload', issues: parsed.error.issues });
  }
  const { listingId, checkIn, checkOut } = parsed.data;
  const guestId = req.userId!;

  const listing = await prisma.listing.findUnique({ where: { id: listingId } });
  if (!listing) {
    return res.status(404).json({ message: 'Listing not found' });
  }

  const overlapping = await prisma.booking.findFirst({
    where: {
      listingId,
      status: { in: ['PENDING', 'CONFIRMED'] },
      OR: [
        {
          checkIn: { lte: new Date(checkOut) },
          checkOut: { gte: new Date(checkIn) }
        }
      ]
    }
  });
  if (overlapping) {
    return res.status(409).json({ message: 'Dates not available' });
  }

  const nights =
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24);
  if (nights <= 0) {
    return res.status(400).json({ message: 'Check-out must be after check-in' });
  }

  const base = listing.nightlyRate * nights;
  const total = base + listing.cleaningFee + listing.serviceFee;

  const booking = await prisma.booking.create({
    data: {
      listingId,
      guestId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      totalPrice: total
    }
  });

  return res.status(201).json(booking);
});

bookingsRouter.get('/me', requireAuth, async (req: AuthRequest, res) => {
  const guestId = req.userId!;
  const bookings = await prisma.booking.findMany({
    where: { guestId },
    include: { listing: { include: { photos: true } } },
    orderBy: { checkIn: 'desc' }
  });
  res.json(bookings);
});

