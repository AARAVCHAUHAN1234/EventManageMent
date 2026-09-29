import React from 'react';

export function StatCard({ title, value, subtitle, icon: Icon, color = 'indigo' }) {
  const colorMap = {
    indigo: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
      border: 'border-indigo-100',
      glow: 'shadow-indigo-500/10',
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100',
      glow: 'shadow-emerald-500/10',
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-100',
      glow: 'shadow-purple-500/10',
    },
    amber: {
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-100',
      glow: 'shadow-amber-500/10',
    },
    rose: {
      bg: 'bg-rose-50',
      text: 'text-rose-600',
      border: 'border-rose-100',
      glow: 'shadow-rose-500/10',
    },
  };

  const scheme = colorMap[color] || colorMap.indigo;

  return (
    <div className={`bg-white p-5 rounded-2xl border ${scheme.border} shadow-sm ${scheme.glow} hover:shadow-md transition-shadow flex items-center justify-between`}>
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </p>
        <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {value}
        </p>
        {subtitle && (
          <p className="text-xs text-slate-500">{subtitle}</p>
        )}
      </div>
      {Icon && (
        <div className={`w-12 h-12 rounded-2xl ${scheme.bg} ${scheme.text} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
