// src/components/ui/RadarChart.jsx
import React from 'react';

/**
 * Gráfico de Telaraña / Radar Poligonal generado puramente en SVG
 * Puede graficar 1 héroe o 2 héroes superpuestos para comparación.
 */
export const RadarChart = ({ hero1, hero2 = null, size = 260 }) => {
  if (!hero1) return null;

  const statsKeys = [
    { key: 'intelligence', label: 'INT' },
    { key: 'strength', label: 'STR' },
    { key: 'speed', label: 'SPD' },
    { key: 'durability', label: 'DUR' },
    { key: 'power', label: 'PWR' },
    { key: 'combat', label: 'CMB' },
  ];

  const totalPoints = statsKeys.length;
  const center = size / 2;
  const radius = (size / 2) - 35;
  const angleStep = (Math.PI * 2) / totalPoints;

  // Función para obtener coordenadas (x, y) de un valor
  const getCoordinates = (value, index, maxVal = 100) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (Math.max(5, value) / maxVal) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Puntos del polígono para un héroe
  const getPolygonPoints = (hero) => {
    if (!hero?.powerstats) return '';
    return statsKeys
      .map((stat, i) => {
        const val = hero.powerstats[stat.key] || 0;
        const { x, y } = getCoordinates(val, i);
        return `${x},${y}`;
      })
      .join(' ');
  };

  const points1 = getPolygonPoints(hero1);
  const points2 = hero2 ? getPolygonPoints(hero2) : null;

  // Telarañas concéntricas de fondo (25%, 50%, 75%, 100%)
  const webLevels = [0.25, 0.5, 0.75, 1];

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <svg width={size} height={size} className="overflow-visible">
        {/* Telarañas concéntricas */}
        {webLevels.map((lvl, idx) => {
          const webPoints = statsKeys
            .map((_, i) => {
              const angle = i * angleStep - Math.PI / 2;
              const r = lvl * radius;
              const x = center + r * Math.cos(angle);
              const y = center + r * Math.sin(angle);
              return `${x},${y}`;
            })
            .join(' ');

          return (
            <polygon
              key={`web-${idx}`}
              points={webPoints}
              fill="none"
              stroke="#262626"
              strokeWidth="1"
              strokeDasharray={idx === webLevels.length - 1 ? 'none' : '2 2'}
            />
          );
        })}

        {/* Ejes radiales (hilos de telaraña) */}
        {statsKeys.map((stat, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);

          // Coordenadas para etiquetas de texto
          const labelDist = radius + 20;
          const labelX = center + labelDist * Math.cos(angle);
          const labelY = center + labelDist * Math.sin(angle);

          return (
            <g key={`axis-${stat.key}`}>
              <line
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#404040"
                strokeWidth="1"
              />
              <text
                x={labelX}
                y={labelY + 4}
                textAnchor="middle"
                className="text-[10px] font-mono font-bold fill-neutral-400"
              >
                {stat.label}
              </text>
            </g>
          );
        })}

        {/* Polígono Héroe 1 (Rojo) */}
        {points1 && (
          <polygon
            points={points1}
            fill="rgba(220, 38, 38, 0.4)"
            stroke="#ef4444"
            strokeWidth="2.5"
            className="transition-all duration-500 ease-out"
          />
        )}

        {/* Puntos Héroe 1 */}
        {statsKeys.map((stat, i) => {
          const val = hero1.powerstats?.[stat.key] || 0;
          const { x, y } = getCoordinates(val, i);
          return (
            <circle
              key={`pt1-${stat.key}`}
              cx={x}
              cy={y}
              r="3.5"
              fill="#dc2626"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          );
        })}

        {/* Polígono Héroe 2 (Azul - Si existe) */}
        {points2 && (
          <>
            <polygon
              points={points2}
              fill="rgba(37, 99, 235, 0.4)"
              stroke="#3b82f6"
              strokeWidth="2.5"
              className="transition-all duration-500 ease-out"
            />
            {statsKeys.map((stat, i) => {
              const val = hero2.powerstats?.[stat.key] || 0;
              const { x, y } = getCoordinates(val, i);
              return (
                <circle
                  key={`pt2-${stat.key}`}
                  cx={x}
                  cy={y}
                  r="3.5"
                  fill="#2563eb"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              );
            })}
          </>
        )}
      </svg>

      {/* Leyenda si hay 2 héroes */}
      {hero2 && (
        <div className="flex items-center gap-6 mt-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-red-400 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
            <span>{hero1.name}</span>
          </div>
          <div className="flex items-center gap-1.5 text-blue-400 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <span>{hero2.name}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RadarChart;
