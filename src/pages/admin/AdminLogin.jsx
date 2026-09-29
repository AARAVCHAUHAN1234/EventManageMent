import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Sparkles, Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, Info, AlertCircle } from 'lucide-react';
import { useAuth, DEMO_CREDENTIALS } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const from = location.state?.from?.pathname || '/admin';

  // If already logged in, redirect to admin dashboard
  React.useEffect(() => {
    if (isAdmin) {
      navigate('/admin', { replace: true });
    }
  }, [isAdmin, navigate]);

  const handleFillDemo = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      toast.success('Welcome back, Admin!');
      navigate(from, { replace: true });
    } else {
      setError(result.error);
      toast.error(result.error);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[#0c0c0c] text-[#F6F3EC]">
      <div className="max-w-md w-full space-y-6 animate-fade-in">
        {/* Brand Top */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#181818] border border-white/10 flex items-center justify-center text-[#ECE5D8] mx-auto shadow-2xl">
            <ShieldCheck className="w-7 h-7 text-[#ECE5D8]" />
          </div>
          <div className="inline-block px-3 py-1 rounded-full bg-[#181818] border border-white/10 text-[#ECE5D8] text-[10px] font-mono uppercase tracking-widest">
            [ SYSTEM ACCESS // ADMIN PORTAL ]
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#F6F3EC] tracking-tight">
            Administrator Sign In
          </h1>
          <p className="text-xs sm:text-sm text-[#A69E8C] font-sans font-light">
            Authorized session required to manage events, deadlines, and attendee rosters.
          </p>
        </div>

        {/* Demo Credentials Helper Pill */}
        <div className="bg-[#181818] border border-white/10 rounded-2xl p-4.5 space-y-2.5 vintage-noise shadow-xl">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#ECE5D8] flex items-center gap-1.5 font-bold">
              <Info className="w-4 h-4 text-[#ECE5D8]" />
              Demo Credentials
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#141414] bg-[#ECE5D8] hover:bg-white px-2.5 py-1 rounded-lg shadow-sm transition-all active:scale-95"
            >
              Auto-Fill Demo
            </button>
          </div>
          <div className="text-xs text-stone-300 font-mono space-y-1 bg-[#121212] p-3 rounded-xl border border-white/10">
            <p><span className="text-[#A69E8C]">Email:</span> {DEMO_CREDENTIALS.email}</p>
            <p><span className="text-[#A69E8C]">Password:</span> {DEMO_CREDENTIALS.password}</p>
          </div>
        </div>

        {/* Login Form Card */}
        <div className="bg-[#141414] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-5 vintage-noise">
          {error && (
            <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl text-xs text-rose-300 flex items-start gap-2 font-mono">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-[#A69E8C] mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#A69E8C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@collegeclub.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-white/10 bg-[#1c1c1c] text-sm text-[#F6F3EC] placeholder-[#A69E8C]/50 focus:outline-none focus:border-[#ECE5D8] focus:ring-1 focus:ring-[#ECE5D8] transition-all font-sans"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-[#A69E8C] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#A69E8C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-white/10 bg-[#1c1c1c] text-sm text-[#F6F3EC] placeholder-[#A69E8C]/50 focus:outline-none focus:border-[#ECE5D8] focus:ring-1 focus:ring-[#ECE5D8] transition-all font-sans"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A69E8C] hover:text-[#F6F3EC] p-1 rounded-md transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-[#F6F3EC] hover:bg-white text-[#141414] font-mono font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-white/10 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#141414]/30 border-t-[#141414] rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security note */}
          <div className="pt-3 border-t border-white/10 text-center">
            <p className="text-[10px] font-mono text-[#A69E8C] leading-relaxed">
              <strong>[NOTICE]:</strong> Client-side storage session for academic demonstration.
            </p>
          </div>
        </div>

        {/* Back to public link */}
        <div className="text-center">
          <Link
            to="/"
            className="text-xs font-mono uppercase tracking-wider text-[#A69E8C] hover:text-[#F6F3EC] transition-colors inline-flex items-center gap-1.5"
          >
            <span>&larr; [ Return to Public Website ]</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
