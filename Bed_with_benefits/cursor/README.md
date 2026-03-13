## BedWithBenefits – modern full‑stack stay platform

BedWithBenefits is a small Airbnb-style full‑stack app that lets guests browse curated stays, view rich listing details and pricing, authenticate, and book trips.

### Tech stack

- **Frontend**: React 18 + TypeScript, Vite, React Router, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: Email + password with JWT

### Exact AI model used

This project was generated and wired together by **GPT-5.1**.

---

### Project structure

- `package.json` – root workspace (frontend + backend)
- `backend` – Express API, Prisma schema, business logic
- `frontend` – React SPA for browsing and booking stays

---

### Getting started

#### 1. Prerequisites

- Node.js 18+
- npm
- Docker (for the Postgres database)

#### 2. Install dependencies

From the repo root:

```bash
npm install
```

This installs dependencies for both `backend` and `frontend` workspaces.

#### 3. Start PostgreSQL

```bash
docker-compose up -d
```

This starts Postgres on `localhost:5432` with database `bedwithbenefits`.

#### 4. Configure environment

From the project root:

```bash
cp .env.example backend/.env
```

Adjust `DATABASE_URL` and `JWT_SECRET` if needed.

#### 5. Run Prisma migrations

```bash
cd backend
npx prisma migrate dev --name init
```

This creates the database schema (users, listings, bookings, reviews, amenities, and photos).

#### 6. Start the backend

From `backend`:

```bash
npm run dev
```

The API will run at `http://localhost:4000`.

#### 7. Start the frontend

From `frontend`:

```bash
npm run dev
```

The SPA will be available at `http://localhost:5173` and proxies API calls to `http://localhost:4000/api`.

---

### Core backend features

- **Auth routes**
  - `POST /api/auth/register` – create account with `email`, `password`, `fullName`
  - `POST /api/auth/login` – log in and receive a JWT
- **Listings**
  - `GET /api/listings` – browse listings with cover photos and average rating
  - `GET /api/listings/:id` – detailed listing info (photos, host, amenities, reviews)
  - `POST /api/listings` – create a new listing (authenticated host)
- **Bookings**
  - `POST /api/bookings` – create a booking for given dates, with conflict checks and total price calculation
  - `GET /api/bookings/me` – list trips for the current user

The schema is defined in `backend/prisma/schema.prisma` and uses relations between `User`, `Listing`, `Booking`, `Review`, `Amenity`, `ListingPhoto`, and `ListingAmenity`.

---

### Core frontend features

- **Home page**: Modern grid of stays with imagery, city/country, nightly price, and rating.
- **Listing page**: Large hero image, description, capacity details, date pickers, and price breakdown card with “Reserve your stay” booking button.
- **Trips page**: Shows past and upcoming trips with dates, thumbnails, and totals.
- **Auth page**: Toggle between sign‑in and sign‑up with a simple, dark UI; JWT is stored in `localStorage` and used when booking or listing user trips.

The UI is built with Tailwind and dark theme styling to feel modern and premium.

---

### Running in production mode (high level)

1. Build both apps from the monorepo root:

```bash
npm run build
```

2. Serve the backend with `node backend/dist/index.js` behind a reverse proxy and host the built frontend in `frontend/dist` via any static file host or the same Node process as needed.

You can extend this project by adding richer search, reviews UI, messaging between guests and hosts, and payment integration.

