import axios from 'axios';
import { useEffect, useState } from 'react';

type Trip = {
  id: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  listing: {
    id: string;
    title: string;
    city: string;
    country: string;
    photos: { id: string; url: string; isCover: boolean }[];
  };
};

export function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('bwb_token');
    if (!token) {
      setLoading(false);
      return;
    }
    axios
      .get<Trip[]>('/api/bookings/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setTrips(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-slate-400 text-sm">Loading your trips...</div>;
  }

  if (!trips.length) {
    return (
      <div className="text-sm text-slate-300">
        You don&apos;t have any trips yet. Book a stay that matches your vibe.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Your trips</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip) => {
          const cover = trip.listing.photos[0];
          return (
            <div
              key={trip.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 shadow-card overflow-hidden"
            >
              {cover && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={cover.url}
                    alt={trip.listing.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4 space-y-1 text-xs text-slate-300">
                <div className="font-medium text-slate-50 text-sm line-clamp-1">
                  {trip.listing.title}
                </div>
                <div className="text-slate-400">
                  {trip.listing.city}, {trip.listing.country}
                </div>
                <div>
                  {new Date(trip.checkIn).toLocaleDateString()} –{' '}
                  {new Date(trip.checkOut).toLocaleDateString()}
                </div>
                <div className="pt-1 font-medium">
                  Total: €{(trip.totalPrice / 100).toFixed(0)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

