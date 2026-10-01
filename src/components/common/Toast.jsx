import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export function ToastContainer({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-[#ECE5D8] flex-shrink-0" />,
  };

  const borderStyles = {
    success: 'border-emerald-500/30',
    error: 'border-rose-500/30',
    warning: 'border-amber-500/30',
    info: 'border-white/15',
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3.5 p-4 rounded-2xl bg-[#181818] border ${
            borderStyles[toast.type] || borderStyles.info
          } shadow-2xl shadow-black/80 text-[#F6F3EC] vintage-noise animate-fade-in transition-all duration-300`}
          role="alert"
        >
          {icons[toast.type] || icons.info}
          <div className="flex-1 text-xs sm:text-sm font-medium text-stone-200 leading-snug">
            {toast.message}
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-[#A69E8C] hover:text-[#F6F3EC] transition-colors p-1 rounded-lg hover:bg-white/5 focus:outline-none"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
