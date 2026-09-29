import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, Compass } from 'lucide-react';

export function HeroMainPanel() {
  return (
    <div className="relative bg-[#141414] text-[#F6F3EC] rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between shadow-2xl vintage-noise group transition-all duration-500 hover:border-white/20">
      {/* Top Header Grid Bar / Metadata */}
      <div className="px-6 sm:px-10 py-5 border-b border-white/10 flex items-center justify-between font-mono text-[11px] sm:text-xs tracking-widest text-[#B8B1A2] uppercase">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#E5DEC9] animate-ping" />
          <span className="text-[#E5DEC9] font-bold">[NEXUS ARCHIVE // VOL. 26]</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[#A69E8C]">
          <span>CAMPUS DIRECTORY</span>
          <span className="text-white/20">•</span>
          <span>ISSUE 04</span>
        </div>
      </div>

      {/* Main Editorial Headline & Circular Button Section */}
      <div className="relative px-6 sm:px-10 pt-8 sm:pt-12 pb-10 sm:pb-16 space-y-7">
        {/* Floating Circular Cream Arrow Action Button */}
        <div className="flex items-start justify-between gap-4">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-[#E5DEC9] backdrop-blur-xs transition-colors hover:border-[#E5DEC9]/40 hover:bg-white/10">
            <Sparkles className="w-3.5 h-3.5 text-[#E5DEC9]" />
            <span>Official University Event Platform</span>
          </div>

          <Link
            to="/events"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F6F3EC] text-[#141414] flex items-center justify-center shadow-xl transition-all duration-500 flex-shrink-0 group/btn border border-[#ECE5D8] hover:bg-[#141414] hover:text-[#F6F3EC] hover:border-white/40 hover:scale-110 active:scale-95 cursor-pointer"
            title="Explore All Events"
            aria-label="Explore All Events"
          >
            <ArrowUpRight className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-500 group-hover/btn:rotate-45 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Link>
        </div>

        {/* Oversized Serif Display Headline with Individual Word Micro-interactions */}
        <div className="space-y-1">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#F6F3EC] leading-[0.92] select-none">
            <span className="inline-block transition-transform duration-300 hover:translate-x-1.5 cursor-default">
              Where
            </span>{' '}
            <br />
            <span className="inline-block italic font-light text-[#ECE5D8] transition-all duration-300 hover:text-white hover:translate-x-2 cursor-default">
              Ideas
            </span>{' '}
            <br />
            <span className="inline-block transition-transform duration-300 hover:translate-x-1.5 cursor-default">
              Happen.
            </span>
          </h1>
        </div>

        {/* Supporting Editorial Description & Action Row */}
        <div className="pt-4 max-w-lg space-y-4">
          <p className="font-sans text-sm sm:text-base text-[#C5BFAe] font-normal leading-relaxed tracking-wide">
            Workshops, competitions, talks and experiences — all in one place.
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-4 font-mono text-[11px] text-[#A69E8C]">
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">REF. 2026 // HUB</span>
            <span>•</span>
            <Link
              to="/events"
              className="text-[#F6F3EC] underline underline-offset-6 hover:text-white transition-all font-semibold flex items-center gap-1 group/link"
            >
              <span>Browse Full Schedule</span>
              <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Contrasting Torn-Paper Section with Distressed Watermark */}
      <div className="torn-paper-edge text-[#141414] pt-8 sm:pt-10 pb-6 px-6 sm:px-10 overflow-hidden relative select-none transition-all duration-300 hover:brightness-105">
        {/* Faint Oversized Background Typography Watermark */}
        <div className="absolute right-4 -top-6 sm:-top-8 font-serif text-7xl sm:text-9xl font-bold tracking-tighter text-[#D8CFBC]/30 uppercase pointer-events-none whitespace-nowrap">
          OFFLINE
        </div>

        {/* Paper Section Content */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#3D382E]">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#141414] bg-[#D8CFBC] px-1.5 py-0.5 rounded">[EST. 2020]</span>
            <span className="text-[#3D382E]/40">•</span>
            <span>TERM 02 // ALL DEPARTMENTS</span>
          </div>

          <div className="flex items-center gap-2 font-bold text-[#141414]">
            <span className="w-2 h-2 rounded-full bg-emerald-700 animate-pulse" />
            <span>08 ACTIVE SESSIONS SCHEDULED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
