import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { json } from 'express';
import { PrismaClient } from '@prisma/client';
import { authRouter } from './routes/auth.js';
import { listingsRouter } from './routes/listings.js';
import { bookingsRouter } from './routes/bookings.js';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true
  })
);
app.use(json());

app.get('/api/health', async (_req, res) => {
  const now = await prisma.$queryRaw`SELECT NOW()`;
  res.json({ status: 'ok', dbTime: now });
});

app.use('/api/auth', authRouter);
app.use('/api/listings', listingsRouter);
app.use('/api/bookings', bookingsRouter);

app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`BedWithBenefits backend listening on http://localhost:${PORT}`);
});

