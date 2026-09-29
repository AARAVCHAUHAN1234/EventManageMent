import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Sparkles, Calendar, Menu, X, ShieldCheck, UserCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Roadmap', path: '/#timeline' },
    { name: 'About', path: '/#about' },
    { name: 'Contact', path: '/#contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none" onClick={closeMenu}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
                Nex<span className="text-indigo-600">Club</span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium tracking-wide uppercase">
                College Event Hub
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isHash = link.path.includes('#');
              if (isHash) {
                return (
                  <a
                    key={link.name}
                    href={link.path}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
                  >
                    {link.name}
                  </a>
                );
              }
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'text-indigo-600 bg-indigo-50/80 font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action: Admin Portal CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isAdmin ? (
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 hover:opacity-95 transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                Admin Dashboard
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                Admin Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3 animate-fade-in shadow-xl">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isHash = link.path.includes('#');
              if (isHash) {
                return (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={closeMenu}
                    className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                  >
                    {link.name}
                  </a>
                );
              }
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100">
            {isAdmin ? (
              <Link
                to="/admin"
                onClick={closeMenu}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm shadow-md"
              >
                <ShieldCheck className="w-4 h-4" />
                Go to Admin Dashboard
              </Link>
            ) : (
              <Link
                to="/admin/login"
                onClick={closeMenu}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 text-slate-800 font-semibold text-sm border border-slate-200 hover:bg-slate-200"
              >
                <UserCheck className="w-4 h-4 text-slate-500" />
                Admin Portal Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
