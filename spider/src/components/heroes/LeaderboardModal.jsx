// src/components/heroes/LeaderboardModal.jsx
import React, { useState } from 'react';
import { useFavorites } from '../../context/FavoritesContext';

export const LeaderboardModal = ({ isOpen, onClose, heroes = [], onSelectHero }) => {
  const { toggleCompare, isComparing, setIsCompareModalOpen } = useFavorites();
  const [activeCategory, setActiveCategory] = useState('total'); // 'total' | 'strength' | 'speed' | 'intelligence' | 'combat'

  if (!isOpen) return null;

  const calculateTotal = (h) => {
    const s = h.powerstats || {};
    return (s.intelligence || 0) + (s.strength || 0) + (s.speed || 0) + (s.durability || 0) + (s.power || 0) + (s.combat || 0);
  };

  const getRankedHeroes = () => {
    const copy = [...heroes];
    if (activeCategory === 'total') {
      return copy.sort((a, b) => calculateTotal(b) - calculateTotal(a)).slice(0, 10);
    }
    return copy.sort((a, b) => (b.powerstats?.[activeCategory] || 0) - (a.powerstats?.[activeCategory] || 0)).slice(0, 10);
  };

  const ranked = getRankedHeroes();
  const top3 = ranked.slice(0, 3);
  const rest = ranked.slice(3);

  const categories = [
    { key: 'total', label: '🏆 Poder Total' },
    { key: 'strength', label: '💪 Fuerza' },
    { key: 'speed', label: '⚡ Velocidad' },
    { key: 'intelligence', label: '🧠 Inteligencia' },
    { key: 'combat', label: '⚔️ Combate' },
  ];

  const getBadgeColor = (idx) => {
    if (idx === 0) return 'border-amber-400 text-amber-300 bg-amber-950/60 shadow-amber-500/30';
    if (idx === 1) return 'border-slate-300 text-slate-200 bg-slate-900/60 shadow-slate-400/20';
    return 'border-amber-700 text-amber-600 bg-amber-950/40 shadow-amber-900/20';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
                Salón de la Fama del Multiverso
              </h2>
              <p className="text-xs text-neutral-400 font-mono">
                Ranking de los seres más poderosos de todas las dimensiones
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-white" type="button">
            ✕
          </button>
        </div>

        {/* Categorías */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeCategory === cat.key
                  ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-md shadow-red-600/30'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Podio Top 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {top3.map((hero, idx) => {
            const val = activeCategory === 'total' ? `${calculateTotal(hero)} pts` : `${hero.powerstats?.[activeCategory] || 0}%`;
            const medal = idx === 0 ? '🥇 1er Lugar' : idx === 1 ? '🥈 2do Lugar' : '🥉 3er Lugar';

            return (
              <div
                key={hero.id}
                className={`p-4 rounded-2xl border flex flex-col items-center text-center shadow-lg transition-transform hover:scale-105 ${getBadgeColor(
                  idx
                )}`}
              >
                <span className="text-xs font-mono font-bold uppercase tracking-wider mb-2">{medal}</span>
                <div className="w-20 h-20 rounded-2xl overflow-hidden mb-2 border border-neutral-700 bg-neutral-900">
                  <img src={hero.images?.sm || hero.images?.md} alt={hero.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-sm font-black text-white truncate max-w-full">{hero.name}</h4>
                <span className="text-xs text-neutral-400 font-mono">{hero.biography?.publisher || 'Multiverse'}</span>
                <span className="text-base font-black text-amber-400 font-mono mt-1">{val}</span>

                <div className="flex items-center gap-2 mt-3 w-full">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectHero(hero);
                    }}
                    className="flex-1 py-1 px-2 text-[11px] bg-neutral-900 hover:bg-neutral-800 text-neutral-200 rounded-lg border border-neutral-700 font-mono"
                  >
                    Ficha
                  </button>
                  <button
                    onClick={() => {
                      toggleCompare(hero);
                      setIsCompareModalOpen(true);
                      onClose();
                    }}
                    className="py-1 px-2.5 text-[11px] bg-red-600 hover:bg-red-500 text-white rounded-lg font-mono font-bold"
                  >
                    VS
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lista Puestos 4 al 10 */}
        <div className="space-y-2 bg-neutral-900/50 p-4 rounded-2xl border border-neutral-800">
          <span className="text-xs font-mono text-neutral-400 font-bold uppercase tracking-wider block mb-2">
            Top 4 - 10 del Multiverso
          </span>
          {rest.map((hero, idx) => {
            const rank = idx + 4;
            const val = activeCategory === 'total' ? `${calculateTotal(hero)} pts` : `${hero.powerstats?.[activeCategory] || 0}%`;

            return (
              <div
                key={hero.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-950/70 border border-neutral-800/80 hover:border-neutral-700 text-xs font-mono transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center font-bold text-neutral-500">#{rank}</span>
                  <img src={hero.images?.sm} alt="" className="w-8 h-8 rounded-lg object-cover border border-neutral-800" />
                  <div>
                    <span className="font-bold text-white font-sans text-sm">{hero.name}</span>
                    <span className="text-[10px] text-neutral-500 block">{hero.biography?.publisher}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-bold text-amber-400 text-sm">{val}</span>
                  <button
                    onClick={() => {
                      onClose();
                      onSelectHero(hero);
                    }}
                    className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-[11px]"
                  >
                    Detalles
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardModal;
