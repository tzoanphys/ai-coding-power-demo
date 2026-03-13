import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { requireAuth, type AuthRequest } from '../middleware/auth.js';

const prisma = new PrismaClient();
export const listingsRouter = Router();

const listingCreateSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  nightlyRate: z.number().int().positive(),
  cleaningFee: z.number().int().nonnegative().default(0),
  serviceFee: z.number().int().nonnegative().default(0),
  maxGuests: z.number().int().positive(),
  bedrooms: z.number().int().nonnegative(),
  bathrooms: z.number().int().nonnegative(),
  addressLine1: z.string(),
  addressLine2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  photos: z.array(z.string().url()).default([]),
  amenities: z.array(z.string()).default([])
});

listingsRouter.get('/', async (_req, res) => {
  const listings = await prisma.listing.findMany({
    include: { photos: true, reviews: true },
    orderBy: { createdAt: 'desc' }
  });
  res.json(
    listings.map((l) => ({
      ...l,
      averageRating:
        l.reviews.length === 0 ? null : l.reviews.reduce((sum, r) => sum + r.rating, 0) / l.reviews.length
    }))
  );
});

listingsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const listing = await prisma.listing.findUnique({
    where: { id },
    include: { photos: true, amenities: { include: { amenity: true } }, reviews: true, host: true }
  });
  if (!listing) {
    return res.status(404).json({ message: 'Listing not found' });
  }
  return res.json(listing);
});

listingsRouter.post('/', requireAuth, async (req: AuthRequest, res) => {
  const parsed = listingCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid payload', issues: parsed.error.issues });
  }
  const userId = req.userId!;
  const data = parsed.data;

  const created = await prisma.listing.create({
    data: {
      title: data.title,
      description: data.description,
      nightlyRate: data.nightlyRate,
      cleaningFee: data.cleaningFee,
      serviceFee: data.serviceFee,
      maxGuests: data.maxGuests,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.city,
      state: data.state,
      country: data.country,
      hostId: userId,
      photos: {
        create: data.photos.map((url, idx) => ({
          url,
          isCover: idx === 0
        }))
      }
    }
  });

  return res.status(201).json(created);
});

