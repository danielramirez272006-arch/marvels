// src/components/heroes/FilterBar.jsx
import React, { useState } from 'react';

export const FilterBar = ({
  selectedPublisher,
  setSelectedPublisher,
  selectedAlignment,
  setSelectedAlignment,
  selectedGender,
  setSelectedGender,
  sortBy,
  setSortBy,
  availablePublishers,
  resetFilters,
  totalResults,
  viewMode = 'grid',
  setViewMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const topPublishers = ['ALL', 'Marvel Comics', 'DC Comics', 'Dark Horse Comics', 'NBC - Heroes'];

  const alignments = [
    { key: 'ALL', label: 'Todos' },
    { key: 'good', label: 'Héroes' },
    { key: 'bad', label: 'Villanos' },
    { key: 'neutral', label: 'Neutrales' },
  ];

  const genders = [
    { key: 'ALL', label: 'Todos' },
    { key: 'Male', label: 'Masculino' },
    { key: 'Female', label: 'Femenino' },
  ];

  const sortOptions = [
    { key: 'name-asc', label: 'Nombre (A - Z)' },
    { key: 'name-desc', label: 'Nombre (Z - A)' },
    { key: 'power-desc', label: 'Poder Total (Mayor a Menor)' },
    { key: 'power-asc', label: 'Poder Total (Menor a Mayor)' },
    { key: 'strength-desc', label: 'Fuerza Extrema' },
    { key: 'speed-desc', label: 'Velocidad Máxima' },
    { key: 'intelligence-desc', label: 'Mayor Inteligencia' },
  ];

  const hasActiveFilters =
    selectedPublisher !== 'ALL' ||
    selectedAlignment !== 'ALL' ||
    selectedGender !== 'ALL' ||
    sortBy !== 'name-asc';

  return (
    <div className="w-full bg-neutral-900/70 border border-neutral-800/80 rounded-2xl p-4 mb-8 backdrop-blur-md transition-all">
      {/* Barra Superior de Controles */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Toggle para Filtros Móvil / Expandir */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold font-mono uppercase bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 rounded-lg border border-neutral-700 transition-colors"
            type="button"
          >
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
            <span>{isOpen ? 'Ocultar Filtros' : 'Filtros Avanzados'}</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            )}
          </button>

          {/* Toggle Vista Grid vs Tabla */}
          {setViewMode && (
            <div className="flex bg-neutral-950 p-0.5 rounded-lg border border-neutral-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1 text-xs rounded font-mono transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-neutral-800 text-white font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Vista en Tarjetas"
                type="button"
              >
                ▦ Grid
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-2.5 py-1 text-xs rounded font-mono transition-colors ${
                  viewMode === 'table'
                    ? 'bg-neutral-800 text-white font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Vista en Tabla"
                type="button"
              >
                ☰ Tabla
              </button>
            </div>
          )}
        </div>

        {/* Selector de Orden Rápido */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-neutral-400 font-mono hidden sm:inline">Ordenar:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-red-500 font-sans cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Reset Filtros */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              title="Restablecer todos los filtros"
              className="px-2.5 py-1.5 text-xs text-red-400 hover:text-white hover:bg-red-950/60 border border-red-800/50 rounded-lg transition-colors font-mono"
              type="button"
            >
              Reset ✕
            </button>
          )}
        </div>
      </div>

      {/* Contenido Desplegable de Filtros */}
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-neutral-800/80 space-y-4 animate-fade-in">
          {/* Filtro Editorial */}
          <div>
            <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-2 font-bold">
              Editorial / Multiverso
            </label>
            <div className="flex flex-wrap gap-1.5">
              {topPublishers.map((pub) => {
                const isSelected = selectedPublisher === pub;
                return (
                  <button
                    key={pub}
                    onClick={() => setSelectedPublisher(pub)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-md shadow-red-600/30 border border-red-400/60'
                        : 'bg-neutral-950/80 text-neutral-400 border border-neutral-800 hover:text-white hover:border-neutral-600'
                    }`}
                    type="button"
                  >
                    {pub === 'ALL' ? 'Todas las Editoriales' : pub}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Alineación y Género */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Bando */}
            <div>
              <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-2 font-bold">
                Bando / Alineación
              </label>
              <div className="grid grid-cols-4 gap-1 bg-neutral-950/80 p-1 rounded-xl border border-neutral-800">
                {alignments.map((a) => (
                  <button
                    key={a.key}
                    onClick={() => setSelectedAlignment(a.key)}
                    className={`py-1 text-xs font-semibold rounded-lg transition-colors text-center ${
                      selectedAlignment === a.key
                        ? 'bg-neutral-800 text-white shadow font-bold text-red-400'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                    type="button"
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Género */}
            <div>
              <label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-2 font-bold">
                Género
              </label>
              <div className="grid grid-cols-3 gap-1 bg-neutral-950/80 p-1 rounded-xl border border-neutral-800">
                {genders.map((g) => (
                  <button
                    key={g.key}
                    onClick={() => setSelectedGender(g.key)}
                    className={`py-1 text-xs font-semibold rounded-lg transition-colors text-center ${
                      selectedGender === g.key
                        ? 'bg-neutral-800 text-white shadow font-bold text-blue-400'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                    type="button"
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
