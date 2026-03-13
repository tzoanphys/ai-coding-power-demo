# BedWithBenefits

An Airbnb-like app for property rentals.

## Quick Start with Docker

1. Ensure Docker and Docker Compose are installed.
2. Run: `docker-compose up --build`
3. Open http://localhost:3000 for frontend, backend on http://localhost:5000

## Manual Setup

### Backend
1. cd backend
2. npm install
3. Set up MongoDB (see below)
4. npm start

### Frontend
1. cd frontend
2. npm install
3. npm start

### Database
Install MongoDB. If using WSL:
- wsl sudo apt update
- wsl sudo apt install mongodb
- wsl sudo systemctl start mongodb

Or use local MongoDB on Windows.

Set MONGO_URI in .env if needed.

## Features
- User registration/login (owner/renter)
- Property listing (owners)
- Booking (renters)