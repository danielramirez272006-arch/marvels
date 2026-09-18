// src/components/heroes/HeroModal.jsx
import React, { useEffect, useState } from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { useToast } from '../../context/ToastContext';
import { downloadHeroTradingCard } from '../../utils/cardGenerator';
import RadarChart from '../ui/RadarChart';

export const HeroModal = ({ hero, onClose }) => {
  const { isFavorite, toggleFavorite, isInTeam, addToTeam, isComparing, toggleCompare, setIsCompareModalOpen } =
    useFavorites();
  const { showToast } = useToast();

  const [viewMode, setViewMode] = useState('bars'); // 'bars' | 'radar'
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!hero) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hero, onClose]);

  if (!hero) return null;

  const favorite = isFavorite(hero.id);
  const inTeam = isInTeam(hero.id);
  const comparing = isComparing(hero.id);

  const stats = [
    { label: 'Inteligencia', value: hero.powerstats?.intelligence || 0, color: 'from-blue-600 to-cyan-400' },
    { label: 'Fuerza', value: hero.powerstats?.strength || 0, color: 'from-red-600 to-orange-400' },
    { label: 'Velocidad', value: hero.powerstats?.speed || 0, color: 'from-amber-500 to-yellow-300' },
    { label: 'Durabilidad', value: hero.powerstats?.durability || 0, color: 'from-emerald-600 to-teal-400' },
    { label: 'Poder', value: hero.powerstats?.power || 0, color: 'from-purple-600 to-indigo-400' },
    { label: 'Combate', value: hero.powerstats?.combat || 0, color: 'from-rose-600 to-pink-500' },
  ];

  const totalPower = stats.reduce((acc, s) => acc + s.value, 0);

  const handleDownloadCard = async () => {
    setIsDownloading(true);
    try {
      await downloadHeroTradingCard(hero);
      showToast(`¡Tarjeta de ${hero.name} descargada en PNG! 📸`, 'success');
    } catch (e) {
      showToast('Error al generar la tarjeta coleccionable.', 'error');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-neutral-900 border border-neutral-700/80 rounded-3xl shadow-2xl shadow-red-950/50 flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de Cierre */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-neutral-950/80 border border-neutral-700 text-neutral-400 hover:text-white hover:bg-red-600 hover:border-red-500 transition-all duration-200"
          type="button"
          title="Cerrar modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Sección de Imagen & Header */}
        <div className="md:w-5/12 relative bg-neutral-950 flex flex-col items-center justify-center min-h-[320px]">
          <img
            src={hero.images?.lg || hero.images?.md || 'https://via.placeholder.com/400x500'}
            alt={hero.name}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/40"></div>

          {/* Información y Acciones sobre la imagen */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3">
            <div>
              <span className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider block">
                {hero.biography?.publisher || 'Editorial Desconocida'}
              </span>
              <h2 className="text-2xl font-black text-white">{hero.name}</h2>
              <span className="text-xs font-mono text-neutral-300">
                Poder Total: <strong className="text-amber-400">{totalPower} pts</strong>
              </span>
            </div>

            {/* Acciones Rápidas */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleFavorite(hero)}
                className={`p-2.5 rounded-xl border flex-1 flex items-center justify-center gap-1 text-xs font-bold transition-all ${
                  favorite
                    ? 'bg-red-600 text-white border-red-400 shadow-md shadow-red-600/40'
                    : 'bg-neutral-900/90 text-neutral-300 border-neutral-700 hover:text-red-400'
                }`}
                type="button"
              >
                <svg className="w-4 h-4" fill={favorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{favorite ? 'Favorito' : '+ Fav'}</span>
              </button>

              <button
                onClick={() => addToTeam(hero)}
                className={`p-2.5 rounded-xl border flex-1 text-xs font-bold transition-all ${
                  inTeam
                    ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/40'
                    : 'bg-neutral-900/90 text-neutral-300 border-neutral-700 hover:text-blue-400'
                }`}
                type="button"
              >
                {inTeam ? '✓ En Equipo' : '+ Equipo'}
              </button>

              <button
                onClick={() => {
                  toggleCompare(hero);
                  setIsCompareModalOpen(true);
                  onClose();
                }}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  comparing
                    ? 'bg-purple-600 text-white border-purple-400'
                    : 'bg-neutral-900/90 text-neutral-300 border-neutral-700 hover:text-purple-400'
                }`}
                title="Llevar a la Arena de Batalla"
                type="button"
              >
                VS
              </button>
            </div>
          </div>
        </div>

        {/* Sección de Detalles y Estadísticas */}
        <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          {/* Estadísticas de Poder */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-bold font-mono tracking-widest text-neutral-400 uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                Nivel de Habilidades
              </h4>

              {/* Selector de visualización (Barras vs Telaraña Radar) */}
              <div className="flex bg-neutral-950 p-1 rounded-lg border border-neutral-800">
                <button
                  onClick={() => setViewMode('bars')}
                  className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                    viewMode === 'bars' ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-500'
                  }`}
                >
                  Barras
                </button>
                <button
                  onClick={() => setViewMode('radar')}
                  className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                    viewMode === 'radar' ? 'bg-red-600 text-white font-bold' : 'text-neutral-500'
                  }`}
                >
                  🕸️ Telaraña
                </button>
              </div>
            </div>

            {viewMode === 'bars' ? (
              <div className="space-y-3">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-neutral-300">{stat.label}</span>
                      <span className="font-mono text-neutral-400">{stat.value}%</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-950 rounded-full overflow-hidden border border-neutral-800">
                      <div
                        className={`h-full bg-gradient-to-r ${stat.color} transition-all duration-700 ease-out`}
                        style={{ width: `${Math.max(5, stat.value)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <RadarChart hero1={hero} size={230} />
            )}
          </div>

          {/* Biografía y Ficha Técnica */}
          <div>
            <h4 className="text-xs font-bold font-mono tracking-widest text-neutral-400 uppercase mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              Ficha Biográfica & Rasgos
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-neutral-950/70 p-4 rounded-2xl border border-neutral-800/80 mb-4">
              <div>
                <span className="text-neutral-500 block">Nombre Real:</span>
                <span className="text-neutral-200 font-medium">
                  {hero.biography?.fullName || 'Desconocido'}
                </span>
              </div>
              <div>
                <span className="text-neutral-500 block">Raza / Especie:</span>
                <span className="text-neutral-200 font-medium">
                  {hero.appearance?.race || 'No especificada'}
                </span>
              </div>
              <div>
                <span className="text-neutral-500 block">Género:</span>
                <span className="text-neutral-200 font-medium">
                  {hero.appearance?.gender || 'Desconocido'}
                </span>
              </div>
              <div>
                <span className="text-neutral-500 block">Lugar de Nacimiento:</span>
                <span className="text-neutral-200 font-medium">
                  {hero.biography?.placeOfBirth || 'Desconocido'}
                </span>
              </div>
            </div>

            {/* Botón Descargar Tarjeta Coleccionable */}
            <button
              onClick={handleDownloadCard}
              disabled={isDownloading}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 hover:scale-[1.01] text-white font-bold rounded-xl text-xs uppercase tracking-wider font-mono shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2"
              type="button"
            >
              <span>{isDownloading ? 'Generando Tarjeta...' : '📸 Descargar Tarjeta Coleccionable (PNG)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroModal;
