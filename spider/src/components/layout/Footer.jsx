// src/components/layout/Footer.jsx
import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full bg-neutral-950 border-t border-neutral-800/80 py-8 px-4 text-center">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
          <p className="text-xs font-mono text-neutral-400">
            Spider/Verse — Laboratorio de Consumo de API
          </p>
        </div>
        <p className="text-xs text-neutral-400">
          Desarrollado con <span className="text-red-500 font-bold">React</span>,{' '}
          <span className="text-blue-400 font-bold">Vite</span> &{' '}
          <span className="text-cyan-400 font-bold">Tailwind CSS</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
