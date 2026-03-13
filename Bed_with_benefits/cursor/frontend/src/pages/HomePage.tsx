import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

type Listing = {
  id: string;
  title: string;
  city: string;
  country: string;
  nightlyRate: number;
  averageRating: number | null;
  photos: { id: string; url: string; isCover: boolean }[];
};

export function HomePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Listing[]>('/api/listings')
      .then((res) => setListings(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">
          Find your next playful getaway
        </h1>
        <p className="text-sm text-slate-400 max-w-xl">
          BedWithBenefits connects you with stylish stays designed for chemistry, comfort, and
          unforgettable nights.
        </p>
      </section>
      {loading ? (
        <div className="text-slate-400 text-sm">Loading curated stays...</div>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => {
            const cover = listing.photos.find((p) => p.isCover) ?? listing.photos[0];
            return (
              <Link
                to={`/listing/${listing.id}`}
                key={listing.id}
                className="group rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-card hover:-translate-y-1 hover:shadow-xl transition-transform"
              >
                {cover && (
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={cover.url}
                      alt={listing.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-4 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-medium text-sm line-clamp-1">{listing.title}</h2>
                    {listing.averageRating && (
                      <span className="inline-flex items-center gap-1 text-xs text-amber-300">
                        ★
                        <span>{listing.averageRating.toFixed(1)}</span>
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400">
                    {listing.city}, {listing.country}
                  </div>
                  <div className="pt-1 text-sm">
                    <span className="font-semibold">
                      €{(listing.nightlyRate / 100).toFixed(0)}
                    </span>{' '}
                    <span className="text-slate-400">night</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      )}
    </div>
  );
}

