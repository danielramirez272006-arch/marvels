// src/components/heroes/HeroTableView.jsx
import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { useToast } from '../../context/ToastContext';

export const HeroTableView = ({ heroes, onSelectHero }) => {
  const { isFavorite, toggleFavorite, isInTeam, addToTeam, isComparing, toggleCompare } = useFavorites();
  const { showToast } = useToast();

  const getAlignmentBadge = (alignment) => {
    switch (alignment) {
      case 'good':
        return 'bg-blue-900/60 text-blue-300 border-blue-500/40';
      case 'bad':
        return 'bg-red-900/60 text-red-300 border-red-500/40';
      default:
        return 'bg-neutral-800 text-neutral-400 border-neutral-700';
    }
  };

  const getStatTotal = (stats) => {
    if (!stats) return 0;
    return (
      (Number(stats.intelligence) || 0) +
      (Number(stats.strength) || 0) +
      (Number(stats.speed) || 0) +
      (Number(stats.durability) || 0) +
      (Number(stats.power) || 0) +
      (Number(stats.combat) || 0)
    );
  };

  return (
    <div className="w-full overflow-x-auto bg-neutral-900/60 border border-neutral-800 rounded-2xl shadow-xl backdrop-blur-md">
      <table className="w-full text-left text-xs font-mono">
        <thead className="bg-neutral-950/80 border-b border-neutral-800 text-neutral-400 uppercase tracking-wider">
          <tr>
            <th className="py-3 px-4">Héroe</th>
            <th className="py-3 px-3">Editorial</th>
            <th className="py-3 px-3">Bando</th>
            <th className="py-3 px-2 text-center text-blue-400">INT</th>
            <th className="py-3 px-2 text-center text-red-400">STR</th>
            <th className="py-3 px-2 text-center text-amber-400">SPD</th>
            <th className="py-3 px-2 text-center text-emerald-400">DUR</th>
            <th className="py-3 px-2 text-center text-purple-400">PWR</th>
            <th className="py-3 px-2 text-center text-rose-400">CMB</th>
            <th className="py-3 px-3 text-center text-amber-300 font-bold">TOTAL</th>
            <th className="py-3 px-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800/60">
          {heroes.map((hero) => {
            const favorite = isFavorite(hero.id);
            const inTeam = isInTeam(hero.id);
            const comparing = isComparing(hero.id);
            const total = getStatTotal(hero.powerstats);

            return (
              <tr
                key={hero.id}
                className="hover:bg-neutral-800/40 transition-colors group cursor-pointer"
                onClick={() => onSelectHero(hero)}
              >
                {/* Héroe Avatar & Nombre */}
                <td className="py-3 px-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-neutral-950 border border-neutral-700 shrink-0">
                    <img
                      src={hero.images?.sm || hero.images?.md}
                      alt={hero.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-bold text-white text-sm group-hover:text-red-400 transition-colors block font-sans">
                      {hero.name}
                    </span>
                    <span className="text-[11px] text-neutral-500 italic block truncate max-w-[150px]">
                      {hero.biography?.fullName || 'Desconocido'}
                    </span>
                  </div>
                </td>

                {/* Editorial */}
                <td className="py-3 px-3 text-neutral-300 font-sans">
                  {hero.biography?.publisher || 'Desconocido'}
                </td>

                {/* Bando */}
                <td className="py-3 px-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getAlignmentBadge(
                      hero.biography?.alignment
                    )}`}
                  >
                    {hero.biography?.alignment === 'good'
                      ? 'Héroe'
                      : hero.biography?.alignment === 'bad'
                      ? 'Villano'
                      : 'Neutral'}
                  </span>
                </td>

                {/* Powerstats */}
                <td className="py-3 px-2 text-center text-neutral-300">{hero.powerstats?.intelligence || 0}</td>
                <td className="py-3 px-2 text-center text-neutral-300">{hero.powerstats?.strength || 0}</td>
                <td className="py-3 px-2 text-center text-neutral-300">{hero.powerstats?.speed || 0}</td>
                <td className="py-3 px-2 text-center text-neutral-300">{hero.powerstats?.durability || 0}</td>
                <td className="py-3 px-2 text-center text-neutral-300">{hero.powerstats?.power || 0}</td>
                <td className="py-3 px-2 text-center text-neutral-300">{hero.powerstats?.combat || 0}</td>

                {/* Total */}
                <td className="py-3 px-3 text-center text-amber-400 font-bold">{total}</td>

                {/* Acciones Rápidas */}
                <td
                  className="py-3 px-4 text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-center gap-1.5">
                    {/* Botón Favorito */}
                    <button
                      onClick={() => {
                        toggleFavorite(hero);
                        showToast(favorite ? `${hero.name} eliminado de favoritos` : `❤️ ${hero.name} agregado a favoritos`, 'success');
                      }}
                      className={`p-1.5 rounded-lg border transition-all ${
                        favorite
                          ? 'bg-red-600 text-white border-red-400'
                          : 'bg-neutral-900 text-neutral-400 border-neutral-700 hover:text-red-400'
                      }`}
                      title={favorite ? 'Quitar Favorito' : 'Agregar Favorito'}
                      type="button"
                    >
                      ❤️
                    </button>

                    {/* Botón Equipo */}
                    <button
                      onClick={() => {
                        const res = addToTeam(hero);
                        showToast(res.message, res.success ? 'success' : 'warning');
                      }}
                      className={`px-2 py-1 rounded-lg border text-[11px] font-bold transition-all ${
                        inTeam
                          ? 'bg-blue-600/40 text-blue-300 border-blue-500'
                          : 'bg-neutral-900 text-neutral-400 border-neutral-700 hover:text-blue-400'
                      }`}
                      title="Alternar en Equipo"
                      type="button"
                    >
                      {inTeam ? '✓ Eq' : '+ Eq'}
                    </button>

                    {/* Botón VS */}
                    <button
                      onClick={() => {
                        toggleCompare(hero);
                        showToast(comparing ? `${hero.name} retirado de la Arena` : `⚔️ ${hero.name} listo para la Arena Versus`, 'info');
                      }}
                      className={`px-2 py-1 rounded-lg border text-[11px] font-bold transition-all ${
                        comparing
                          ? 'bg-purple-600 text-white border-purple-400'
                          : 'bg-neutral-900 text-neutral-400 border-neutral-700 hover:text-purple-400'
                      }`}
                      title="Llevar a Versus"
                      type="button"
                    >
                      VS
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HeroTableView;
