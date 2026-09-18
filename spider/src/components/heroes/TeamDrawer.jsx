// src/components/heroes/TeamDrawer.jsx
import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';

export const TeamDrawer = ({ isOpen, onClose, onSelectHero }) => {
  const { team, removeFromTeam, clearTeam, teamPowerAverage, exportData } = useFavorites();

  if (!isOpen) return null;

  const maxSlots = 5;
  const slots = Array.from({ length: maxSlots }, (_, i) => team[i] || null);

  const getTeamTier = (avg) => {
    if (avg >= 85) return { name: 'Nivel Cósmico / Dios', color: 'text-amber-400', border: 'border-amber-500/50' };
    if (avg >= 70) return { name: 'Escuadrón Omega / Vengadores', color: 'text-red-400', border: 'border-red-500/50' };
    if (avg >= 50) return { name: 'Defensores de la Tierra', color: 'text-blue-400', border: 'border-blue-500/50' };
    return { name: 'Iniciados del Multiverso', color: 'text-emerald-400', border: 'border-emerald-500/50' };
  };

  const tier = getTeamTier(teamPowerAverage);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-neutral-950 border border-neutral-800 sm:rounded-3xl p-6 shadow-2xl overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado del Equipo */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></span>
              <h2 className="text-xl font-black text-white uppercase tracking-wider">
                Escuadrón del Multiverso
              </h2>
            </div>
            <p className="text-xs text-neutral-400 font-mono mt-1">
              {team.length} de {maxSlots} héroes reclutados — Rango:{' '}
              <span className={`font-bold ${tier.color}`}>{tier.name}</span>
            </p>
          </div>

          {/* Estadísticas de Poder Global del Equipo */}
          <div className="flex items-center gap-4 bg-neutral-900/80 px-4 py-2 rounded-xl border border-neutral-800">
            <div className="text-right font-mono">
              <span className="text-[10px] text-neutral-500 block">PODER PROMEDIO</span>
              <span className={`text-lg font-black ${tier.color}`}>{teamPowerAverage}%</span>
            </div>
            <div className="flex items-center gap-2 border-l border-neutral-800 pl-4">
              <button
                onClick={exportData}
                className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono rounded-lg border border-neutral-700 transition-colors"
                title="Descargar datos en JSON"
                type="button"
              >
                💾 Exportar
              </button>
              {team.length > 0 && (
                <button
                  onClick={clearTeam}
                  className="px-2.5 py-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-400 text-xs font-mono rounded-lg border border-red-800/50 transition-colors"
                  type="button"
                >
                  Vaciar
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 text-neutral-400 hover:text-white transition-colors"
                type="button"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Slots del Equipo (5 Espacios) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 my-4">
          {slots.map((hero, index) => {
            if (!hero) {
              return (
                <div
                  key={`empty-${index}`}
                  className="aspect-[3/4] rounded-2xl border-2 border-dashed border-neutral-800 flex flex-col items-center justify-center p-3 text-center bg-neutral-900/20"
                >
                  <span className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-600 font-mono text-xs mb-2">
                    {index + 1}
                  </span>
                  <span className="text-[11px] text-neutral-500 font-mono">Slot Disponible</span>
                </div>
              );
            }

            return (
              <div
                key={hero.id}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-neutral-700 bg-neutral-900 shadow-md flex flex-col justify-end p-2.5"
              >
                <img
                  src={hero.images?.sm || hero.images?.md}
                  alt={hero.name}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>

                {/* Botón expulsar */}
                <button
                  onClick={() => removeFromTeam(hero.id)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-neutral-950/80 border border-neutral-700 text-neutral-400 hover:text-white hover:bg-red-600 transition-colors flex items-center justify-center text-xs"
                  title="Expulsar del equipo"
                  type="button"
                >
                  ✕
                </button>

                <div className="relative z-10">
                  <h4 className="text-xs font-black text-white truncate">{hero.name}</h4>
                  <button
                    onClick={() => {
                      onClose();
                      onSelectHero(hero);
                    }}
                    className="text-[10px] text-blue-400 hover:underline block font-mono mt-0.5"
                  >
                    Ver Ficha &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {team.length === 0 && (
          <p className="text-center text-xs text-neutral-500 font-mono mt-4">
            Recluta hasta 5 héroes haciendo clic en el botón <strong className="text-blue-400">+ Equipo</strong> en las tarjetas.
          </p>
        )}
      </div>
    </div>
  );
};

export default TeamDrawer;
