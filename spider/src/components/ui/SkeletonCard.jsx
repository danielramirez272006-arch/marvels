// src/components/ui/SkeletonCard.jsx
import React from 'react';

export const SkeletonCard = () => {
  return (
    <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl overflow-hidden flex flex-col animate-pulse">
      {/* Imagen Placeholder con shimmer */}
      <div className="aspect-[3/4] w-full bg-neutral-800/60 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>

      {/* Contenido Placeholder */}
      <div className="p-4 space-y-3">
        <div className="h-3 w-1/3 bg-neutral-800 rounded"></div>
        <div className="h-5 w-3/4 bg-neutral-800 rounded"></div>
        <div className="h-3 w-1/2 bg-neutral-800/70 rounded"></div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <div className="h-8 bg-neutral-950/60 rounded border border-neutral-800"></div>
          <div className="h-8 bg-neutral-950/60 rounded border border-neutral-800"></div>
        </div>

        <div className="h-8 w-full bg-neutral-800 rounded-xl mt-3"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
