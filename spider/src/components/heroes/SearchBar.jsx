// src/components/heroes/SearchBar.jsx
import React from 'react';

export const SearchBar = ({ value, onChange, placeholder = 'Buscar por héroe, identidad o editorial...' }) => {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Icono de Lupa */}
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
        <svg
          className="w-5 h-5 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Input de Búsqueda */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-2.5 sm:py-3 bg-neutral-900/90 border border-neutral-700/80 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 shadow-inner backdrop-blur transition-all duration-300"
      />

      {/* Botón para Limpiar */}
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-white transition-colors"
          title="Limpiar búsqueda"
          type="button"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
