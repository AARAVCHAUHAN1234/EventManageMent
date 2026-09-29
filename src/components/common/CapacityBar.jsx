import React from 'react';
import { Users } from 'lucide-react';

export function CapacityBar({ count, max, percentage, showText = true, className = '' }) {
  const isFull = count >= max;
  const isAlmostFull = percentage >= 85 && !isFull;

  let barColor = 'bg-[#ECE5D8]';
  let textColor = 'text-[#A69E8C]';

  if (isFull) {
    barColor = 'bg-rose-500';
    textColor = 'text-rose-400 font-semibold';
  } else if (isAlmostFull) {
    barColor = 'bg-amber-400';
    textColor = 'text-amber-400 font-semibold';
  }

  return (
    <div className={`w-full ${className}`}>
      {showText && (
        <div className="flex items-center justify-between text-xs font-mono mb-1.5">
          <span className="flex items-center gap-1 text-[#A69E8C]">
            <Users className="w-3.5 h-3.5" />
            Capacity
          </span>
          <span className={textColor}>
            {count} / {max} {isFull ? '(Full)' : 'filled'}
          </span>
        </div>
      )}
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${barColor}`}
          style={{ width: `${Math.min(100, percentage)}%` }}
        />
      </div>
    </div>
  );
}
