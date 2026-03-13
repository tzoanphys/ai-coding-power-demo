import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const payload =
        mode === 'login'
          ? { email, password }
          : {
              email,
              password,
              fullName
            };
      const res = await axios.post(endpoint, payload);
      localStorage.setItem('bwb_token', res.data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Could not authenticate');
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          {mode === 'login' ? 'Welcome back' : 'Join BedWithBenefits'}
        </h1>
        <p className="text-sm text-slate-400">
          {mode === 'login'
            ? 'Sign in to pick up where the chemistry left off.'
            : 'Create an account to start saving and booking your favorite stays.'}
        </p>
      </div>
      <div className="inline-flex rounded-full bg-slate-900 p-1 border border-slate-800 text-xs">
        <button
          type="button"
          onClick={() => setMode('login')}
          className={`flex-1 px-4 py-1.5 rounded-full transition-colors ${
            mode === 'login' ? 'bg-slate-800 text-slate-50' : 'text-slate-400'
          }`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setMode('register')}
          className={`flex-1 px-4 py-1.5 rounded-full transition-colors ${
            mode === 'register' ? 'bg-slate-800 text-slate-50' : 'text-slate-400'
          }`}
        >
          Sign up
        </button>
      </div>
      <form onSubmit={submit} className="space-y-4 text-sm">
        {mode === 'register' && (
          <div className="space-y-1">
            <label className="block text-xs text-slate-300">Full name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              required
            />
          </div>
        )}
        <div className="space-y-1">
          <label className="block text-xs text-slate-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs text-slate-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            required
          />
        </div>
        {error && <div className="text-xs text-rose-400">{error}</div>}
        <button
          type="submit"
          className="w-full rounded-xl bg-brand-500 hover:bg-brand-600 text-sm font-medium py-2.5 shadow-card transition-colors"
        >
          {mode === 'login' ? 'Sign in' : 'Create account'}
        </button>
      </form>
    </div>
  );
}

