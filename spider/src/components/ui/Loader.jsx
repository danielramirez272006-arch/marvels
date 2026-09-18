// src/components/ui/Loader.jsx
import React from 'react';

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      {/* Spider-Verse Ring Animation */}
      <div className="relative w-24 h-24 mb-6">
        {/* Outer Red Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-t-red-600 border-r-transparent border-b-red-900/40 border-l-transparent animate-spin"></div>
        {/* Middle Blue Ring */}
        <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-blue-500 border-b-transparent border-l-blue-900/40 animate-spin [animation-direction:reverse] [animation-duration:1.5s]"></div>
        {/* Central Core Pulse */}
        <div className="absolute inset-5 rounded-full bg-gradient-to-tr from-red-600 to-blue-600 animate-pulse opacity-80 flex items-center justify-center shadow-lg shadow-red-600/40">
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        </div>
      </div>

      <h3 className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-blue-500 uppercase">
        Sincronizando Multiverso
      </h3>
      <p className="text-sm text-neutral-400 mt-2 font-mono">
        Cargando base de datos de superhéroes...
      </p>
    </div>
  );
};

export default Loader;
