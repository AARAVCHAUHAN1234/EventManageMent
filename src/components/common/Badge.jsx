import React from 'react';

const CATEGORY_COLORS = {
  Workshop: 'bg-white/10 text-[#ECE5D8] border-white/20',
  Hackathon: 'bg-white/15 text-white border-white/25',
  Seminar: 'bg-stone-800/80 text-[#DFD6C5] border-stone-700',
  Competition: 'bg-amber-950/40 text-amber-200 border-amber-500/30',
  Cultural: 'bg-stone-800/70 text-[#E5DEC9] border-stone-600/50',
  Sports: 'bg-white/10 text-[#F6F3EC] border-white/20',
  Technical: 'bg-stone-800 text-[#ECE5D8] border-white/15',
  Other: 'bg-white/5 text-stone-300 border-white/10',
};

export function CategoryBadge({ category, className = '' }) {
  const colorClass = CATEGORY_COLORS[category] || CATEGORY_COLORS.Other;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border ${colorClass} ${className}`}
    >
      {category || 'Event'}
    </span>
  );
}

export function StatusBadge({ status, className = '' }) {
  const isUpcoming = status === 'upcoming';
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border ${
        isUpcoming
          ? 'bg-emerald-950/50 text-emerald-300 border-emerald-500/30'
          : 'bg-white/5 text-stone-400 border-white/10'
      } ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isUpcoming ? 'bg-emerald-400 animate-pulse' : 'bg-stone-500'
        }`}
      />
      {isUpcoming ? 'Upcoming' : 'Past Event'}
    </span>
  );
}
