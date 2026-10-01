import React from 'react';

export function StatCard({ title, value, subtitle, icon: Icon, color = 'indigo' }) {
  const colorMap = {
    indigo: {
      iconBg: 'bg-white/5',
      iconText: 'text-[#ECE5D8]',
      tag: 'text-[#ECE5D8]',
    },
    emerald: {
      iconBg: 'bg-emerald-950/40',
      iconText: 'text-emerald-400',
      tag: 'text-emerald-400',
    },
    purple: {
      iconBg: 'bg-white/5',
      iconText: 'text-[#E5DEC9]',
      tag: 'text-[#E5DEC9]',
    },
    amber: {
      iconBg: 'bg-amber-950/40',
      iconText: 'text-amber-400',
      tag: 'text-amber-400',
    },
    rose: {
      iconBg: 'bg-rose-950/40',
      iconText: 'text-rose-400',
      tag: 'text-rose-400',
    },
  };

  const scheme = colorMap[color] || colorMap.indigo;

  return (
    <div className="bg-[#141414] p-5 sm:p-6 rounded-3xl border border-white/10 shadow-2xl hover:border-white/20 transition-all flex items-center justify-between vintage-noise">
      <div className="space-y-1.5">
        <p className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-[#A69E8C]">
          [ {title} ]
        </p>
        <p className="text-3xl sm:text-4xl font-serif font-bold text-[#F6F3EC] tracking-tight">
          {value}
        </p>
        {subtitle && (
          <p className="text-xs text-[#8A8272] font-sans font-light">{subtitle}</p>
        )}
      </div>
      {Icon && (
        <div className={`w-12 h-12 rounded-2xl ${scheme.iconBg} ${scheme.iconText} border border-white/10 flex items-center justify-center flex-shrink-0 shadow-inner`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
