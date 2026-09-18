// src/components/heroes/HeroCard.jsx
import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { useToast } from '../../context/ToastContext';

export const HeroCard = ({ hero, onSelect }) => {
  const { isFavorite, toggleFavorite, isInTeam, addToTeam, isComparing, toggleCompare } = useFavorites();
  const { showToast } = useToast();

  const favorite = isFavorite(hero.id);
  const inTeam = isInTeam(hero.id);
  const comparing = isComparing(hero.id);

  const getAlignmentBadge = (alignment) => {
    switch (alignment) {
      case 'good':
        return 'bg-blue-900/70 text-blue-300 border-blue-500/50';
      case 'bad':
        return 'bg-red-900/70 text-red-300 border-red-500/50';
      default:
        return 'bg-neutral-800/80 text-neutral-300 border-neutral-600/50';
    }
  };

  const handleToggleCompare = (e) => {
    e.stopPropagation();
    toggleCompare(hero);
    if (!comparing) {
      showToast(`⚔️ ${hero.name} listo para la Arena Versus`, 'info');
    } else {
      showToast(`${hero.name} retirado de la Arena`, 'info');
    }
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(hero);
    if (!favorite) {
      showToast(`❤️ ${hero.name} agregado a favoritos`, 'success');
    } else {
      showToast(`${hero.name} eliminado de favoritos`, 'info');
    }
  };

  const handleToggleTeam = (e) => {
    e.stopPropagation();
    const res = addToTeam(hero);
    if (res.success) {
      showToast(res.message, 'success');
    } else {
      showToast(res.message, 'warning');
    }
  };

  return (
    <div className="group relative bg-neutral-900/90 border border-neutral-800 hover:border-red-500/80 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-red-600/20 hover:-translate-y-1.5 backdrop-blur-sm">
      {/* Contenedor de Imagen */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950">
        <img
          src={hero.images?.md || hero.images?.sm || 'https://via.placeholder.com/300x400?text=No+Image'}
          alt={hero.name}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {/* Degradado sobre la imagen */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent"></div>

        {/* Barra de Acciones Rápidas Superiores */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {/* Botón VS (Comparar) */}
          <button
            onClick={handleToggleCompare}
            className={`p-2 rounded-xl backdrop-blur-md border text-xs font-black transition-all ${
              comparing
                ? 'bg-blue-600 text-white border-blue-400 scale-110 shadow-lg shadow-blue-600/50'
                : 'bg-neutral-900/80 text-neutral-400 border-neutral-700 hover:text-blue-400 hover:border-blue-500'
            }`}
            title={comparing ? 'Quitar de la Arena VS' : 'Agregar a la Arena VS'}
            type="button"
          >
            VS
          </button>

          {/* Botón Favorito */}
          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
              favorite
                ? 'bg-red-600 text-white border-red-400 scale-110 shadow-lg shadow-red-600/50'
                : 'bg-neutral-900/80 text-neutral-400 border-neutral-700 hover:text-red-400 hover:border-red-500'
            }`}
            title={favorite ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
            type="button"
          >
            <svg
              className="w-4 h-4"
              fill={favorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* Badge de Bando (Good / Bad / Neutral) */}
        {hero.biography?.alignment && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full border backdrop-blur-md ${getAlignmentBadge(
              hero.biography.alignment
            )}`}
          >
            {hero.biography.alignment === 'good'
              ? 'Héroe'
              : hero.biography.alignment === 'bad'
              ? 'Villano'
              : 'Neutral'}
          </span>
        )}
      </div>

      {/* Contenido de la Tarjeta */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block truncate">
            {hero.biography?.publisher || 'Desconocido'}
          </span>
          <h3 className="text-lg font-black text-white group-hover:text-red-400 transition-colors truncate">
            {hero.name}
          </h3>
          <p className="text-xs text-neutral-400 italic truncate mb-3">
            {hero.biography?.fullName || 'Identidad Oculta'}
          </p>

          {/* Mini Estadísticas Rápidas */}
          <div className="grid grid-cols-2 gap-2 text-[10px] text-neutral-300 font-mono mb-4 bg-neutral-950/70 p-2 rounded-lg border border-neutral-800">
            <div>
              <span className="text-neutral-500 block">COMBATE</span>
              <span className="font-bold text-red-400">{hero.powerstats?.combat || 0}%</span>
            </div>
            <div>
              <span className="text-neutral-500 block">PODER</span>
              <span className="font-bold text-blue-400">{hero.powerstats?.power || 0}%</span>
            </div>
          </div>
        </div>

        {/* Botonera de Acción */}
        <div className="grid grid-cols-2 gap-2">
          {/* Botón Reclutar a Equipo */}
          <button
            onClick={handleToggleTeam}
            type="button"
            className={`py-2 px-2 text-[11px] font-bold uppercase rounded-xl border transition-all truncate flex items-center justify-center gap-1 ${
              inTeam
                ? 'bg-blue-600/30 text-blue-300 border-blue-500'
                : 'bg-neutral-800/80 text-neutral-300 border-neutral-700 hover:text-blue-400 hover:border-blue-500'
            }`}
          >
            <span>{inTeam ? '✓ Equipo' : '+ Equipo'}</span>
          </button>

          {/* Botón Ver Detalles */}
          <button
            onClick={() => onSelect(hero)}
            type="button"
            className="py-2 px-2 text-[11px] font-bold uppercase tracking-wider bg-neutral-800/80 hover:bg-gradient-to-r hover:from-red-600 hover:to-blue-600 text-white rounded-xl border border-neutral-700/80 hover:border-transparent transition-all flex items-center justify-center gap-1 shadow-sm"
          >
            <span>Detalles</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
