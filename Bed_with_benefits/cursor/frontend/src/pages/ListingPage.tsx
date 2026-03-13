import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type ListingDetail = {
  id: string;
  title: string;
  description: string;
  city: string;
  country: string;
  nightlyRate: number;
  cleaningFee: number;
  serviceFee: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  photos: { id: string; url: string; isCover: boolean }[];
};

export function ListingPage() {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<ListingDetail | null>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/listings/${id}`).then((res) => setListing(res.data));
  }, [id]);

  const nights =
    checkIn && checkOut
      ? (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
      : 0;

  const base = listing && nights > 0 ? (listing.nightlyRate * nights) / 100 : 0;
  const total =
    listing && nights > 0
      ? (listing.nightlyRate * nights + listing.cleaningFee + listing.serviceFee) / 100
      : 0;

  const book = async () => {
    if (!id || !checkIn || !checkOut) return;
    try {
      const token = localStorage.getItem('bwb_token');
      const res = await axios.post(
        '/api/bookings',
        { listingId: id, checkIn, checkOut },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined
        }
      );
      if (res.status === 201) {
        setStatus('Booking confirmed!');
      }
    } catch (err: any) {
      setStatus(err.response?.data?.message ?? 'Could not book this stay');
    }
  };

  if (!listing) {
    return <div className="text-slate-400 text-sm">Loading stay details...</div>;
  }

  const cover = listing.photos[0];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight mb-1">{listing.title}</h1>
          <div className="text-sm text-slate-400">
            {listing.city}, {listing.country}
          </div>
        </div>
        {cover && (
          <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-card">
            <img src={cover.url} alt={listing.title} className="w-full h-full object-cover" />
          </div>
        )}
        <p className="text-sm leading-relaxed text-slate-200 whitespace-pre-line">
          {listing.description}
        </p>
        <div className="text-xs text-slate-400">
          Sleeps up to {listing.maxGuests} · {listing.bedrooms} bedrooms · {listing.bathrooms}{' '}
          bathrooms
        </div>
      </div>
      <aside className="h-fit rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-card space-y-4">
        <div className="flex items-baseline justify-between gap-2">
          <div className="text-lg">
            <span className="font-semibold text-slate-50">
              €{(listing.nightlyRate / 100).toFixed(0)}
            </span>{' '}
            <span className="text-xs text-slate-400">night</span>
          </div>
        </div>
        <div className="space-y-2 text-xs text-slate-300">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-[11px] uppercase tracking-[0.12em] text-slate-400 mb-1">
                Check-in
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[11px] uppercase tracking-[0.12em] text-slate-400 mb-1">
                Check-out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="border-t border-slate-800 pt-2 space-y-1">
            <div className="flex justify-between">
              <span>Base ({nights || 0} nights)</span>
              <span>€{base.toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Cleaning & service</span>
              <span>
                €
                {((listing.cleaningFee + listing.serviceFee) / 100).toFixed(0)}
              </span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-800 mt-1 font-medium">
              <span>Total</span>
              <span>€{total.toFixed(0)}</span>
            </div>
          </div>
        </div>
        <button
          onClick={book}
          className="w-full rounded-xl bg-brand-500 hover:bg-brand-600 text-sm font-medium py-2.5 shadow-card transition-colors"
        >
          Reserve your stay
        </button>
        {status && <div className="text-xs text-slate-300">{status}</div>}
      </aside>
    </div>
  );
}

