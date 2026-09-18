// src/components/heroes/CompareModal.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import RadarChart from '../ui/RadarChart';
import BattleSimulator from './BattleSimulator';

export const CompareModal = ({ isOpen, onClose, heroes = [] }) => {
  const { compareHeroes, clearCompare, toggleCompare, setFighter1, setFighter2 } = useFavorites();
  const [activeTab, setActiveTab] = useState('stats'); // 'stats' | 'simulator'

  // Búsqueda interna dentro del modal para seleccionar luchadores
  const [searchFighter1, setSearchFighter1] = useState('');
  const [searchFighter2, setSearchFighter2] = useState('');
  const [selectingSlot, setSelectingSlot] = useState(null); // null | 1 | 2

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectingSlot) {
          setSelectingSlot(null);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, selectingSlot]);

  // Si no hay héroes seleccionados al abrir, inicializar con 2 sugeridos si hay catálogo
  useEffect(() => {
    if (isOpen && compareHeroes.length === 0 && heroes.length >= 2) {
      const spider = heroes.find((h) => h.name.toLowerCase().includes('spider-man')) || heroes[0];
      const rival = heroes.find((h) => h.name.toLowerCase().includes('venom')) || heroes[1];
      setFighter1(spider);
      setFighter2(rival);
    }
  }, [isOpen, heroes]);

  if (!isOpen) return null;

  const hero1 = compareHeroes[0] || null;
  const hero2 = compareHeroes[1] || null;

  const statsList = [
    { key: 'intelligence', label: 'Inteligencia' },
    { key: 'strength', label: 'Fuerza' },
    { key: 'speed', label: 'Velocidad' },
    { key: 'durability', label: 'Durabilidad' },
    { key: 'power', label: 'Poder' },
    { key: 'combat', label: 'Combate' },
  ];

  const getHeroTotal = (hero) => {
    if (!hero?.powerstats) return 0;
    return Object.values(hero.powerstats).reduce((a, b) => a + (Number(b) || 0), 0);
  };

  const total1 = getHeroTotal(hero1);
  const total2 = getHeroTotal(hero2);

  const getWinner = () => {
    if (!hero1 || !hero2) return null;
    if (total1 > total2) return hero1;
    if (total2 > total1) return hero2;
    return { name: 'Empate Técnico' };
  };

  const winner = getWinner();

  const handlePickRandom = (slot) => {
    if (heroes.length === 0) return;
    const random = heroes[Math.floor(Math.random() * heroes.length)];
    if (slot === 1) setFighter1(random);
    else setFighter2(random);
    setSelectingSlot(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl p-4 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800 mb-6">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-gradient-to-tr from-red-600 to-blue-600 rounded-xl text-white shadow-lg shadow-red-600/30">
              ⚔️
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
                Arena del Multiverso — <span className="text-red-500">Versus Mode</span>
              </h2>
              <p className="text-xs text-neutral-400 font-mono">
                Comparativa de datos y simulación de combate en tiempo real
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {hero1 && hero2 && (
              <div className="flex bg-neutral-900 p-1 rounded-xl border border-neutral-800">
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`px-3 py-1 text-xs font-mono rounded-lg transition-colors ${
                    activeTab === 'stats' ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-400'
                  }`}
                >
                  📊 Estadísticas
                </button>
                <button
                  onClick={() => setActiveTab('simulator')}
                  className={`px-3 py-1 text-xs font-mono rounded-lg transition-colors ${
                    activeTab === 'simulator' ? 'bg-red-600 text-white font-bold' : 'text-neutral-400'
                  }`}
                >
                  ⚔️ Simular Pelea
                </button>
              </div>
            )}
            <button
              onClick={clearCompare}
              className="px-2.5 py-1.5 text-xs text-neutral-400 hover:text-white border border-neutral-800 rounded-lg hover:bg-neutral-900 transition-colors font-mono"
              type="button"
            >
              Limpiar
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg hover:bg-red-600 transition-colors"
              type="button"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal interno para seleccionar luchador */}
        {selectingSlot && (
          <div className="mb-6 p-4 bg-neutral-900 rounded-2xl border border-neutral-700 animate-slide-up">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-mono font-bold text-white uppercase">
                Seleccionar Luchador {selectingSlot} ({selectingSlot === 1 ? 'Rincón Rojo' : 'Rincón Azul'})
              </h4>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePickRandom(selectingSlot)}
                  className="px-2.5 py-1 bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 text-xs font-mono rounded-lg border border-amber-500/50"
                  type="button"
                >
                  🎲 Aleatorio
                </button>
                <button
                  onClick={() => setSelectingSlot(null)}
                  className="text-neutral-400 hover:text-white text-xs"
                  type="button"
                >
                  ✕
                </button>
              </div>
            </div>

            <input
              type="text"
              placeholder="Buscar héroe o villano..."
              value={selectingSlot === 1 ? searchFighter1 : searchFighter2}
              onChange={(e) => {
                if (selectingSlot === 1) setSearchFighter1(e.target.value);
                else setSearchFighter2(e.target.value);
              }}
              className="w-full px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-xs font-mono mb-3 focus:outline-none focus:border-red-500"
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-1">
              {heroes
                .filter((h) => {
                  const query = (selectingSlot === 1 ? searchFighter1 : searchFighter2).toLowerCase();
                  return !query || h.name.toLowerCase().includes(query) || h.biography?.publisher?.toLowerCase().includes(query);
                })
                .slice(0, 12)
                .map((h) => (
                  <button
                    key={h.id}
                    onClick={() => {
                      if (selectingSlot === 1) setFighter1(h);
                      else setFighter2(h);
                      setSelectingSlot(null);
                    }}
                    className="flex items-center gap-2 p-1.5 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-red-500 text-left transition-colors truncate"
                  >
                    <img src={h.images?.sm} alt="" className="w-8 h-8 rounded-lg object-cover" />
                    <div className="truncate">
                      <span className="text-xs font-bold text-white block truncate">{h.name}</span>
                      <span className="text-[10px] text-neutral-500 block truncate">{h.biography?.publisher}</span>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Luchadores Frente a Frente */}
        <div className="grid grid-cols-2 gap-4 sm:gap-8 items-center mb-6">
          {/* Luchador 1 */}
          <div className="flex flex-col items-center text-center p-3 bg-neutral-900/60 rounded-2xl border border-red-900/40 relative">
            <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest mb-1">
              Rincón Rojo
            </span>
            {hero1 ? (
              <>
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden mb-2 border-2 border-red-500 shadow-md shadow-red-600/30">
                  <img
                    src={hero1.images?.md || hero1.images?.sm}
                    alt={hero1.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-sm sm:text-base font-black text-white truncate max-w-full">
                  {hero1.name}
                </h4>
                <span className="text-xs text-red-400 font-mono">{total1} pts</span>
                <button
                  onClick={() => setSelectingSlot(1)}
                  className="mt-2 text-[11px] text-neutral-400 hover:text-red-400 font-mono underline"
                >
                  Cambiar peleador
                </button>
              </>
            ) : (
              <div className="py-4">
                <button
                  onClick={() => setSelectingSlot(1)}
                  className="px-4 py-2 bg-red-600/30 hover:bg-red-600/50 text-red-300 font-mono text-xs rounded-xl border border-red-500/50 font-bold"
                >
                  + Elegir Luchador 1
                </button>
              </div>
            )}
          </div>

          {/* Luchador 2 */}
          <div className="flex flex-col items-center text-center p-3 bg-neutral-900/60 rounded-2xl border border-blue-900/40 relative">
            <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest mb-1">
              Rincón Azul
            </span>
            {hero2 ? (
              <>
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden mb-2 border-2 border-blue-500 shadow-md shadow-blue-600/30">
                  <img
                    src={hero2.images?.md || hero2.images?.sm}
                    alt={hero2.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-sm sm:text-base font-black text-white truncate max-w-full">
                  {hero2.name}
                </h4>
                <span className="text-xs text-blue-400 font-mono">{total2} pts</span>
                <button
                  onClick={() => setSelectingSlot(2)}
                  className="mt-2 text-[11px] text-neutral-400 hover:text-blue-400 font-mono underline"
                >
                  Cambiar peleador
                </button>
              </>
            ) : (
              <div className="py-4">
                <button
                  onClick={() => setSelectingSlot(2)}
                  className="px-4 py-2 bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 font-mono text-xs rounded-xl border border-blue-500/50 font-bold"
                >
                  + Elegir Luchador 2
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Contenido Principal (si ambos están presentes) */}
        {hero1 && hero2 ? (
          <div>
            {activeTab === 'stats' ? (
              <>
                {/* Banner de Ganador Estimado */}
                <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-red-950/60 via-purple-950/40 to-blue-950/60 border border-red-500/40 text-center relative overflow-hidden">
                  <span className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase block mb-1">
                    Pronóstico de Poder Global
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-white to-blue-400">
                    {winner?.name === 'Empate Técnico'
                      ? '¡Empate de Poder Absoluto!'
                      : `🏆 ${winner?.name} lidera en poder general`}
                  </h3>
                </div>

                {/* Gráfica de Telaraña Comparativa & Barras */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-neutral-900/40 p-4 sm:p-6 rounded-2xl border border-neutral-800">
                  {/* Radar Poligonal Superpuesto */}
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 font-bold">
                      🕸️ Telaraña de Habilidades Superpuesta
                    </span>
                    <RadarChart hero1={hero1} hero2={hero2} size={240} />
                  </div>

                  {/* Barras Comparativas */}
                  <div className="space-y-3">
                    {statsList.map((stat) => {
                      const val1 = Number(hero1.powerstats?.[stat.key]) || 0;
                      const val2 = Number(hero2.powerstats?.[stat.key]) || 0;
                      const winner1 = val1 > val2;
                      const winner2 = val2 > val1;

                      return (
                        <div key={stat.key} className="space-y-1">
                          <div className="flex justify-between text-xs font-mono font-bold">
                            <span className={winner1 ? 'text-red-400' : 'text-neutral-400'}>
                              {val1}% {winner1 && '👑'}
                            </span>
                            <span className="text-neutral-300 uppercase tracking-wider text-[10px]">
                              {stat.label}
                            </span>
                            <span className={winner2 ? 'text-blue-400' : 'text-neutral-400'}>
                              {winner2 && '👑'} {val2}%
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-1.5 h-2.5">
                            <div className="bg-neutral-950 rounded-l-full overflow-hidden flex justify-end">
                              <div
                                className={`h-full ${winner1 ? 'bg-red-500' : 'bg-red-900/50'}`}
                                style={{ width: `${Math.max(5, val1)}%` }}
                              ></div>
                            </div>
                            <div className="bg-neutral-950 rounded-r-full overflow-hidden flex justify-start">
                              <div
                                className={`h-full ${winner2 ? 'bg-blue-500' : 'bg-blue-900/50'}`}
                                style={{ width: `${Math.max(5, val2)}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              /* Pestaña del Simulador de Batalla */
              <BattleSimulator hero1={hero1} hero2={hero2} />
            )}
          </div>
        ) : (
          <div className="text-center py-6 px-4">
            <p className="text-xs text-neutral-400 font-mono mb-4">
              Selecciona dos personajes arriba para comparar sus habilidades o simular un combate.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  handlePickRandom(1);
                  handlePickRandom(2);
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-blue-600 text-white font-bold rounded-xl text-xs uppercase font-mono tracking-wider shadow-md hover:scale-105 transition-all"
              >
                🎲 Emparejar 2 Héroes al Azar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareModal;
