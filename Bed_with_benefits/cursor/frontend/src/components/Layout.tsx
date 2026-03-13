import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem('bwb_token'));
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem('bwb_token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-brand-500 to-rose-400 shadow-card">
              <span className="text-xl font-black">B</span>
            </span>
            <div className="leading-tight">
              <div className="font-semibold tracking-tight">BedWithBenefits</div>
              <div className="text-[11px] text-slate-400">Stay, play, and getaway</div>
            </div>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link
              to="/"
              className="px-3 py-1.5 rounded-full hover:bg-slate-800/80 transition-colors"
            >
              Browse stays
            </Link>
            {token && (
              <Link
                to="/trips"
                className="px-3 py-1.5 rounded-full hover:bg-slate-800/80 transition-colors"
              >
                My trips
              </Link>
            )}
            {!token ? (
              <Link
                to="/auth"
                className="px-4 py-1.5 rounded-full bg-brand-500 hover:bg-brand-600 text-sm font-medium shadow-card transition-colors"
              >
                Sign in
              </Link>
            ) : (
              <button
                onClick={logout}
                className="px-3 py-1.5 rounded-full border border-slate-700 hover:bg-slate-800 text-xs uppercase tracking-[0.12em]"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8">{children}</div>
      </main>
      <footer className="border-t border-slate-800 text-xs text-slate-500 py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <span>© {new Date().getFullYear()} BedWithBenefits</span>
          <span>Built with love and modern web tech</span>
        </div>
      </footer>
    </div>
  );
}

