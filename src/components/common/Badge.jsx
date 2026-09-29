import React from 'react';

const CATEGORY_COLORS = {
  Workshop: 'bg-blue-50 text-blue-700 border-blue-200/60',
  Hackathon: 'bg-purple-50 text-purple-700 border-purple-200/60',
  Seminar: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
  Competition: 'bg-amber-50 text-amber-700 border-amber-200/60',
  Cultural: 'bg-pink-50 text-pink-700 border-pink-200/60',
  Sports: 'bg-orange-50 text-orange-700 border-orange-200/60',
  Technical: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
  Other: 'bg-slate-50 text-slate-700 border-slate-200/60',
};

export function CategoryBadge({ category, className = '' }) {
  const colorClass = CATEGORY_COLORS[category] || CATEGORY_COLORS.Other;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colorClass} ${className}`}
    >
      {category || 'Event'}
    </span>
  );
}

export function StatusBadge({ status, className = '' }) {
  const isUpcoming = status === 'upcoming';
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
        isUpcoming
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200/70'
          : 'bg-slate-100 text-slate-600 border-slate-200'
      } ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isUpcoming ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
        }`}
      />
      {isUpcoming ? 'Upcoming' : 'Past Event'}
    </span>
  );
}
