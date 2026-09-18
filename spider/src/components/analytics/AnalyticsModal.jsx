// src/components/analytics/AnalyticsModal.jsx
import React from 'react';

export const AnalyticsModal = ({ isOpen, onClose, heroes = [] }) => {
  if (!isOpen || heroes.length === 0) return null;

  const total = heroes.length;

  // 1. Alineación
  const goodCount = heroes.filter((h) => h.biography?.alignment === 'good').length;
  const badCount = heroes.filter((h) => h.biography?.alignment === 'bad').length;
  const neutralCount = total - goodCount - badCount;

  const goodPct = Math.round((goodCount / total) * 100);
  const badPct = Math.round((badCount / total) * 100);
  const neutralPct = 100 - goodPct - badPct;

  // 2. Editoriales
  const publisherCounts = {};
  heroes.forEach((h) => {
    const pub = h.biography?.publisher || 'Otros';
    publisherCounts[pub] = (publisherCounts[pub] || 0) + 1;
  });

  const topPubs = Object.entries(publisherCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // 3. Promedios globales de estadísticas
  const getAverageStat = (statKey) => {
    const sum = heroes.reduce((acc, h) => acc + (h.powerstats?.[statKey] || 0), 0);
    return Math.round(sum / total);
  };

  const avgStats = [
    { label: 'Inteligencia', val: getAverageStat('intelligence'), color: 'from-blue-600 to-cyan-400' },
    { label: 'Fuerza', val: getAverageStat('strength'), color: 'from-red-600 to-orange-400' },
    { label: 'Velocidad', val: getAverageStat('speed'), color: 'from-amber-500 to-yellow-300' },
    { label: 'Durabilidad', val: getAverageStat('durability'), color: 'from-emerald-600 to-teal-400' },
    { label: 'Poder', val: getAverageStat('power'), color: 'from-purple-600 to-indigo-400' },
    { label: 'Combate', val: getAverageStat('combat'), color: 'from-rose-600 to-pink-500' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📊</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
                Dashboard de Analítica del Multiverso
              </h2>
              <p className="text-xs text-neutral-400 font-mono">
                Métricas demográficas y estadísticas de poder globales ({total} entidades analizadas)
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-white" type="button">
            ✕
          </button>
        </div>

        {/* 1. Proporción Héroes vs Villanos */}
        <div className="bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800 space-y-3">
          <span className="text-xs font-mono text-neutral-400 uppercase font-bold tracking-wider block">
            Distribución por Bando / Alineación
          </span>
          <div className="flex justify-between text-xs font-mono">
            <span className="text-blue-400 font-bold">Héroes: {goodCount} ({goodPct}%)</span>
            <span className="text-red-400 font-bold">Villanos: {badCount} ({badPct}%)</span>
            <span className="text-neutral-400 font-bold">Neutrales: {neutralCount} ({neutralPct}%)</span>
          </div>
          <div className="h-4 w-full bg-neutral-950 rounded-full overflow-hidden flex border border-neutral-800">
            <div style={{ width: `${goodPct}%` }} className="bg-blue-600 h-full" title="Héroes"></div>
            <div style={{ width: `${badPct}%` }} className="bg-red-600 h-full" title="Villanos"></div>
            <div style={{ width: `${neutralPct}%` }} className="bg-neutral-600 h-full" title="Neutrales"></div>
          </div>
        </div>

        {/* 2. Top Editoriales & Promedios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Top Editoriales */}
          <div className="bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800 space-y-3">
            <span className="text-xs font-mono text-neutral-400 uppercase font-bold tracking-wider block">
              Distribución por Editorial
            </span>
            <div className="space-y-2">
              {topPubs.map(([pub, count]) => {
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={pub} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-neutral-300 truncate max-w-[150px]">{pub}</span>
                      <span className="text-neutral-400">{count} ({pct}%)</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-950 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-600 to-blue-600"
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Promedios de Estadísticas del Multiverso */}
          <div className="bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800 space-y-3">
            <span className="text-xs font-mono text-neutral-400 uppercase font-bold tracking-wider block">
              Promedio de Habilidades Global
            </span>
            <div className="space-y-2">
              {avgStats.map((st) => (
                <div key={st.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-300">{st.label}</span>
                    <span className="font-bold text-white">{st.val}%</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-950 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${st.color}`}
                      style={{ width: `${st.val}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsModal;
