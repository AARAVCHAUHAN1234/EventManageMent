import React from 'react';
import { Users } from 'lucide-react';

export function CapacityBar({ count, max, percentage, showText = true, className = '' }) {
  const isFull = count >= max;
  const isAlmostFull = percentage >= 85 && !isFull;

  let barColor = 'bg-indigo-600';
  let textColor = 'text-slate-600';

  if (isFull) {
    barColor = 'bg-rose-500';
    textColor = 'text-rose-600 font-semibold';
  } else if (isAlmostFull) {
    barColor = 'bg-amber-500';
    textColor = 'text-amber-600 font-semibold';
  }

  return (
    <div className={`w-full ${className}`}>
      {showText && (
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="flex items-center gap-1 text-slate-500 font-medium">
            <Users className="w-3.5 h-3.5" />
            Capacity
          </span>
          <span className={textColor}>
            {count} / {max} {isFull ? '(Full)' : 'spots filled'}
          </span>
        </div>
      )}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${barColor}`}
          style={{ width: `${Math.min(100, percentage)}%` }}
        />
      </div>
    </div>
  );
}
