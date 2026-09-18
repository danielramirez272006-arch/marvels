// src/components/ui/ShortcutsModal.jsx
import React, { useEffect } from 'react';

export const ShortcutsModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shortcuts = [
    { key: '/', desc: 'Enfocar la barra de búsqueda' },
    { key: 'T', desc: 'Abrir el minijuego de Trivia' },
    { key: 'V', desc: 'Abrir la Arena Versus / Comparador' },
    { key: 'E', desc: 'Abrir el Escuadrón del Multiverso' },
    { key: 'R', desc: 'Salto Dimensional (Héroe Aleatorio)' },
    { key: 'M', desc: 'Activar / Desactivar efectos de sonido' },
    { key: '?', desc: 'Mostrar este panel de atajos de teclado' },
    { key: 'Esc', desc: 'Cerrar cualquier modal abierto' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">⌨️</span>
            <h3 className="text-lg font-black text-white uppercase tracking-wider">
              Atajos del Multiverso
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-neutral-400 hover:text-white" type="button">
            ✕
          </button>
        </div>

        <div className="space-y-3">
          {shortcuts.map((s, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-xs font-mono"
            >
              <span className="text-neutral-300">{s.desc}</span>
              <kbd className="px-2.5 py-1 bg-neutral-950 border border-neutral-700 rounded-lg text-red-400 font-bold shadow-inner">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <p className="text-center text-[11px] text-neutral-500 font-mono">
          Navega rápidamente como un auténtico arácnido del Multiverso.
        </p>
      </div>
    </div>
  );
};

export default ShortcutsModal;
