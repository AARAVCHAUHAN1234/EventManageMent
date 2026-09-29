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
    <header className="sticky top-0 z-40 bg-[#0c0c0c]/90 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo with Editorial Styling */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none" onClick={closeMenu}>
            <div className="w-10 h-10 rounded-xl bg-[#F6F3EC] text-[#141414] flex items-center justify-center font-bold shadow-md group-hover:scale-105 group-hover:bg-white transition-all duration-300">
              <Sparkles className="w-5 h-5 text-[#141414]" />
            </div>
            <div>
              <div className="flex items-center gap-1 font-serif text-xl sm:text-2xl text-[#F6F3EC] tracking-tight">
                Nex<span className="italic font-light text-[#E5DEC9]">Club</span>
              </div>
              <p className="font-mono text-[9px] sm:text-[10px] text-[#A69E8C] font-normal tracking-widest uppercase">
                CAMPUS EVENT ARCHIVE
              </p>
            </div>
          </Link>

          {/* Desktop Navigation with Floating Pill Indicator Effect */}
          <div className="hidden md:block">
            <div className="nav-pill-wrapper">
              <nav className="nav-pill-container">
                {navLinks.map((link) => {
                  const isHash = link.path.includes('#');
                  if (isHash) {
                    return (
                      <a
                        key={link.name}
                        href={link.path}
                        className="transition-colors"
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
                        `transition-all ${isActive ? 'active-link' : ''}`
                      }
                    >
                      {link.name}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Right Action: Admin Portal CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isAdmin ? (
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F6F3EC] text-[#141414] text-xs font-bold uppercase tracking-wider shadow-md hover:bg-white hover:scale-105 transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Console</span>
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider text-[#E5DEC9] bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#A69E8C]" />
                <span>Admin Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-[#E5DEC9] hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#E5DEC9]"
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
        <div className="md:hidden border-b border-white/10 bg-[#121212] px-4 pt-2 pb-6 space-y-3 animate-fade-in shadow-2xl">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isHash = link.path.includes('#');
              if (isHash) {
                return (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={closeMenu}
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#C5BFAe] hover:bg-white/5 hover:text-white"
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
                    `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-white/10 text-white font-bold'
                        : 'text-[#C5BFAe] hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              );
            })}
          </div>

          <div className="pt-4 border-t border-white/10">
            {isAdmin ? (
              <Link
                to="/admin"
                onClick={closeMenu}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#F6F3EC] text-[#141414] font-bold text-xs uppercase tracking-wider shadow-md"
              >
                <ShieldCheck className="w-4 h-4" />
                Go to Admin Console
              </Link>
            ) : (
              <Link
                to="/admin/login"
                onClick={closeMenu}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 text-[#E5DEC9] font-mono text-xs uppercase tracking-wider border border-white/15 hover:bg-white/10"
              >
                <UserCheck className="w-4 h-4 text-[#A69E8C]" />
                Admin Portal Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
