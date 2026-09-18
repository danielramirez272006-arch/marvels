// src/components/ui/ToastContainer.jsx
import React from 'react';

export const ToastContainer = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  const getTypeStyles = (type) => {
    switch (type) {
      case 'success':
        return 'border-emerald-500/80 bg-neutral-950/95 text-emerald-300 shadow-emerald-950/50';
      case 'error':
        return 'border-red-500/80 bg-neutral-950/95 text-red-300 shadow-red-950/50';
      case 'warning':
        return 'border-amber-500/80 bg-neutral-950/95 text-amber-300 shadow-amber-950/50';
      default:
        return 'border-blue-500/80 bg-neutral-950/95 text-blue-300 shadow-blue-950/50';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return '🕷️';
      case 'error':
        return '⚠️';
      case 'warning':
        return '⚡';
      default:
        return '🕸️';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-2xl border backdrop-blur-xl shadow-xl transition-all duration-300 animate-slide-up ${getTypeStyles(
            toast.type
          )}`}
        >
          <div className="flex items-center gap-2.5">
            <span className="text-base">{getIcon(toast.type)}</span>
            <p className="text-xs font-semibold font-mono tracking-wide text-white">
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => onRemove(toast.id)}
            className="text-neutral-500 hover:text-white text-xs transition-colors p-1"
            type="button"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
