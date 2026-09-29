import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export function ToastContainer({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-500 flex-shrink-0" />,
  };

  const bgStyles = {
    success: 'bg-white border-emerald-100 shadow-emerald-500/10',
    error: 'bg-white border-rose-100 shadow-rose-500/10',
    warning: 'bg-white border-amber-100 shadow-amber-500/10',
    info: 'bg-white border-indigo-100 shadow-indigo-500/10',
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl transition-all duration-300 transform translate-y-0 opacity-100 ${
            bgStyles[toast.type] || bgStyles.info
          }`}
          role="alert"
        >
          {icons[toast.type] || icons.info}
          <div className="flex-1 text-sm font-medium text-slate-800 leading-snug">
            {toast.message}
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-300"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
