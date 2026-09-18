// src/pages/HomePage.jsx
import React, { useEffect, useMemo, useState } from 'react';
import AnalyticsModal from '../components/analytics/AnalyticsModal';
import CompareModal from '../components/heroes/CompareModal';
import CustomHeroModal from '../components/heroes/CustomHeroModal';
import FilterBar from '../components/heroes/FilterBar';
import HeroCard from '../components/heroes/HeroCard';
import HeroModal from '../components/heroes/HeroModal';
import HeroTableView from '../components/heroes/HeroTableView';
import LeaderboardModal from '../components/heroes/LeaderboardModal';
import TeamDrawer from '../components/heroes/TeamDrawer';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import TriviaModal from '../components/trivia/TriviaModal';
import Loader from '../components/ui/Loader';
import Pagination from '../components/ui/Pagination';
import ShortcutsModal from '../components/ui/ShortcutsModal';
import SkeletonCard from '../components/ui/SkeletonCard';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { useHeroes } from '../hooks/useHeroes';
import { toggleSound } from '../utils/soundEffects';

export const HomePage = () => {
  const {
    heroes,
    filteredHeroes,
    loading,
    error,
    searchTerm,
    setSearchTerm,
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
    getRandomHero,
    addCustomHero,
  } = useHeroes(12);

  const {
    favorites,
    isCompareModalOpen,
    setIsCompareModalOpen,
  } = useFavorites();

  const { showToast } = useToast();

  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [isTriviaOpen, setIsTriviaOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isCustomHeroOpen, setIsCustomHeroOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [selectedHero, setSelectedHero] = useState(null);
  const [favPage, setFavPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filtrado reactivo si el usuario está en la vista de Favoritos
  const currentHeroesList = useMemo(() => {
    if (!showOnlyFavorites) return filteredHeroes;

    let result = [...favorites];
    const term = searchTerm.trim().toLowerCase();
    if (term) {
      result = result.filter((hero) => {
        const nameMatch = hero.name?.toLowerCase().includes(term);
        const fullNameMatch = hero.biography?.fullName?.toLowerCase().includes(term);
        const publisherMatch = hero.biography?.publisher?.toLowerCase().includes(term);
        return nameMatch || fullNameMatch || publisherMatch;
      });
    }
    if (selectedPublisher !== 'ALL') {
      result = result.filter((hero) => hero.biography?.publisher === selectedPublisher);
    }
    if (selectedAlignment !== 'ALL') {
      result = result.filter((hero) => (hero.biography?.alignment || 'neutral') === selectedAlignment);
    }
    if (selectedGender !== 'ALL') {
      result = result.filter((hero) => (hero.appearance?.gender || '-') === selectedGender);
    }
    return result;
  }, [showOnlyFavorites, favorites, filteredHeroes, searchTerm, selectedPublisher, selectedAlignment, selectedGender]);

  const activePage = showOnlyFavorites ? favPage : currentPage;
  const setActivePage = showOnlyFavorites ? setFavPage : setCurrentPage;

  const totalResults = currentHeroesList.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / itemsPerPage));

  const paginatedHeroes = useMemo(() => {
    const start = (activePage - 1) * itemsPerPage;
    return currentHeroesList.slice(start, start + itemsPerPage);
  }, [currentHeroesList, activePage, itemsPerPage]);

  const handleRandomHero = () => {
    const hero = getRandomHero();
    if (hero) {
      setSelectedHero(hero);
      showToast(`¡Salto Dimensional: ${hero.name}! 🎲`, 'info');
    }
  };

  // Atajos de teclado globales del Multiverso
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target?.tagName)) {
        return;
      }

      if (e.key === '/') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]');
        searchInput?.focus();
      } else if (e.key.toLowerCase() === 't') {
        setIsTriviaOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === 'v') {
        setIsCompareModalOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === 'e') {
        setIsTeamOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === 'r') {
        handleRandomHero();
      } else if (e.key.toLowerCase() === 'c') {
        setIsCustomHeroOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === 'l') {
        setIsLeaderboardOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === 'm') {
        const res = toggleSound();
        showToast(res ? 'Sonido activado 🔊' : 'Sonido silenciado 🔇', 'info');
      } else if (e.key === '?' || (e.shiftKey && e.key === '?')) {
        setIsShortcutsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [getRandomHero]);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 selection:bg-red-600 selection:text-white">
      {/* Header Superior */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showOnlyFavorites={showOnlyFavorites}
        setShowOnlyFavorites={(val) => {
          setShowOnlyFavorites(val);
          setFavPage(1);
          setCurrentPage(1);
        }}
        onOpenTeam={() => setIsTeamOpen(true)}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onRandomHero={handleRandomHero}
        onOpenTrivia={() => setIsTriviaOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        onOpenCustomHero={() => setIsCustomHeroOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
      />

      {/* Contenido Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Barra de Filtros y Ordenamiento */}
        <FilterBar
          selectedPublisher={selectedPublisher}
          setSelectedPublisher={setSelectedPublisher}
          selectedAlignment={selectedAlignment}
          setSelectedAlignment={setSelectedAlignment}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
          sortBy={sortBy}
          setSortBy={setSortBy}
          availablePublishers={availablePublishers}
          resetFilters={resetFilters}
          totalResults={totalResults}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* Encabezado de la Vista */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-neutral-800/80 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></span>
              {showOnlyFavorites ? 'Mis Superhéroes Favoritos' : 'Directorio de Héroes del Multiverso'}
            </h2>
            <p className="text-xs text-neutral-400 font-mono mt-0.5">
              {showOnlyFavorites
                ? 'Colección personal guardada en el dispositivo.'
                : 'Accede a datos biográficos, niveles de poder y comparativas en tiempo real.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-neutral-400 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800">
              {totalResults} resultado(s)
            </span>
          </div>
        </div>

        {/* 1. Loading con Skeletons */}
        {loading && (
          <div className="space-y-8">
            <Loader />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        )}

        {/* 2. Error */}
        {!loading && error && (
          <div className="p-6 bg-red-950/40 border border-red-600/50 rounded-2xl text-center my-12 max-w-lg mx-auto backdrop-blur">
            <div className="w-12 h-12 rounded-full bg-red-600/20 text-red-500 mx-auto flex items-center justify-center mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Error de Comunicación con la Red</h3>
            <p className="text-sm text-neutral-300 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors uppercase font-mono"
            >
              Reintentar Conexión
            </button>
          </div>
        )}

        {/* 3. Grid o Tabla de Héroes */}
        {!loading && !error && (
          <>
            {paginatedHeroes.length > 0 ? (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {paginatedHeroes.map((hero) => (
                      <HeroCard
                        key={hero.id}
                        hero={hero}
                        onSelect={(heroData) => setSelectedHero(heroData)}
                      />
                    ))}
                  </div>
                ) : (
                  <HeroTableView
                    heroes={paginatedHeroes}
                    onSelectHero={(heroData) => setSelectedHero(heroData)}
                  />
                )}

                {/* Paginación */}
                <Pagination
                  currentPage={activePage}
                  totalPages={totalPages}
                  onPageChange={(newPage) => {
                    setActivePage(newPage);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  totalResults={totalResults}
                  itemsPerPage={itemsPerPage}
                />
              </>
            ) : (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 mb-4 text-2xl">
                  🕸️
                </div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {showOnlyFavorites
                    ? 'No tienes superhéroes guardados en Favoritos'
                    : 'Sin resultados en esta frecuencia dimensional'}
                </h3>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-6">
                  {showOnlyFavorites
                    ? 'Marca el ícono de corazón en cualquier tarjeta para agregarlo a tus favoritos.'
                    : 'Prueba restableciendo los filtros o buscando con otros términos.'}
                </p>
                <button
                  onClick={() => {
                    if (showOnlyFavorites) setShowOnlyFavorites(false);
                    resetFilters();
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-blue-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all hover:scale-105 shadow-md shadow-red-600/30"
                >
                  Restablecer Vista
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Modal Ficha Técnica */}
      {selectedHero && (
        <HeroModal
          hero={selectedHero}
          onClose={() => setSelectedHero(null)}
        />
      )}

      {/* Modal Comparador (Versus Mode + Simulador) */}
      <CompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
      />

      {/* Drawer Escuadrón del Multiverso */}
      <TeamDrawer
        isOpen={isTeamOpen}
        onClose={() => setIsTeamOpen(false)}
        onSelectHero={(hero) => setSelectedHero(hero)}
      />

      {/* Minijuego de Trivia */}
      <TriviaModal
        isOpen={isTriviaOpen}
        onClose={() => setIsTriviaOpen(false)}
        heroes={heroes}
      />

      {/* Creador de Variantes */}
      <CustomHeroModal
        isOpen={isCustomHeroOpen}
        onClose={() => setIsCustomHeroOpen(false)}
        onSaveCustomHero={(newHero) => addCustomHero(newHero)}
      />

      {/* Salón de la Fama / Leaderboard */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        heroes={heroes}
        onSelectHero={(hero) => setSelectedHero(hero)}
      />

      {/* Dashboard de Analítica */}
      <AnalyticsModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        heroes={heroes}
      />

      {/* Modal de Atajos de Teclado */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
