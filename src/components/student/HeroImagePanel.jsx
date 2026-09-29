import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export function HeroImagePanel() {
  return (
    <Link
      to="/events"
      className="group relative bg-[#141414] rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between shadow-2xl min-h-[380px] lg:min-h-full transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 block"
      title="Discover What's Happening"
    >
      {/* Top Editorial Index Tag */}
      <div className="relative z-10 px-6 py-5 border-b border-white/10 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-[#B8B1A2] bg-gradient-to-b from-[#141414]/95 via-[#141414]/70 to-transparent backdrop-blur-xs">
        <span className="font-bold text-[#E5DEC9]">[FIG. 01 — SESSIONS]</span>
        <span className="text-[#B8B1A2] group-hover:text-white group-hover:translate-x-1 transition-all">
          NO. 26-B &rarr;
        </span>
      </div>

      {/* Analog Distressed Monochrome Photograph Container */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#141414]">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
          alt="Campus creative students"
          className="w-full h-full object-cover photocopy-filter group-hover:scale-108 transition-transform duration-700 ease-out opacity-70 group-hover:opacity-85"
        />
        {/* Analog noise and gradient scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-[#141414]/60 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-75" />
        <div className="absolute inset-0 vintage-noise pointer-events-none opacity-60" />
      </div>

      {/* Bottom Editorial Caption & Metadata Label */}
      <div className="relative z-10 p-6 sm:p-8 space-y-2 bg-gradient-to-t from-[#141414] via-[#141414]/90 to-transparent">
        <div className="font-mono text-[10px] uppercase tracking-widest text-[#A69E8C] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E5DEC9]" />
          <span>Campus — Events</span>
        </div>
        <div className="flex items-end justify-between gap-3">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#F6F3EC] leading-tight font-normal group-hover:text-white transition-colors">
            Discover what's happening.
          </h3>
          <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 text-[#F6F3EC] flex items-center justify-center flex-shrink-0 group-hover:bg-[#F6F3EC] group-hover:text-[#141414] group-hover:scale-110 transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
          </div>
        </div>
      </div>
    </Link>
  );
}
