// src/components/layout/Header.jsx
import React, { useRef, useState } from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { isSoundEnabled, toggleSound } from '../../utils/soundEffects';
import SearchBar from '../heroes/SearchBar';

export const Header = ({
  searchTerm,
  setSearchTerm,
  showOnlyFavorites,
  setShowOnlyFavorites,
  onOpenTeam,
  onOpenCompare,
  onRandomHero,
  onOpenTrivia,
  onOpenShortcuts,
}) => {
  const { favoritesCount, teamCount, compareHeroes, exportData, importData } = useFavorites();
  const { currentTheme, setTheme, themes } = useTheme();
  const { showToast } = useToast();
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const fileInputRef = useRef(null);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    showToast(newState ? 'Efectos de sonido activados 🔊' : 'Sonido desactivado 🔇', 'info');
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = importData(event.target?.result);
      if (result.success) {
        showToast(result.message, 'success');
      } else {
        showToast(result.message, 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleExport = () => {
    exportData();
    showToast('Base de datos exportada en formato JSON 💾', 'success');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/85 backdrop-blur-xl border-b border-neutral-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Logo & Spider-Verse Branding */}
          <div
            className="flex items-center gap-3 cursor-pointer self-start lg:self-center"
            onClick={() => {
              setShowOnlyFavorites(false);
              setSearchTerm('');
            }}
          >
            <div className={`relative w-10 h-10 rounded-xl bg-gradient-to-tr ${currentTheme.primary} p-0.5 shadow-lg shadow-red-600/30 flex items-center justify-center`}>
              <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center text-lg">
                {currentTheme.icon}
              </div>
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1">
                <span className="text-red-500">SPIDER</span>
                <span className="text-neutral-500 font-light">/</span>
                <span className="text-blue-500">VERSE</span>
              </h1>
              <p className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                Multiverse Hub
              </p>
            </div>
          </div>

          {/* SearchBar Component */}
          <div className="w-full lg:max-w-md">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>

          {/* Quick Action Navigation Bar */}
          <div className="flex flex-wrap items-center justify-end gap-2 w-full lg:w-auto">
            {/* Selector de Skins del Multiverso */}
            <select
              value={currentTheme.id}
              onChange={(e) => {
                setTheme(e.target.value);
                showToast(`Dimensión cambiada a: ${e.target.value.toUpperCase()} 🌌`, 'info');
              }}
              className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs rounded-xl px-2.5 py-2 font-mono cursor-pointer focus:outline-none focus:border-red-500"
              title="Cambiar Skin / Universo"
            >
              {themes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.icon} {t.name.split(' ')[0]}
                </option>
              ))}
            </select>

            {/* Botón Trivia Minijuego */}
            <button
              onClick={onOpenTrivia}
              className="px-3 py-2 bg-gradient-to-r from-amber-600/30 to-red-600/30 border border-amber-500/50 hover:border-amber-400 text-amber-300 rounded-xl text-xs font-bold font-mono transition-all hover:scale-105"
              type="button"
            >
              🎮 Trivia
            </button>

            {/* Botón Salto al Multiverso (Random Hero) */}
            <button
              onClick={onRandomHero}
              className="p-2 sm:px-3 sm:py-2 bg-neutral-900 border border-neutral-800 hover:border-red-500/80 text-red-400 rounded-xl text-xs font-bold font-mono transition-all hover:bg-red-950/20"
              title="Descubrir un héroe aleatorio del Multiverso [Atajo: R]"
              type="button"
            >
              🎲 <span className="hidden sm:inline">Aleatorio</span>
            </button>

            {/* Botón Batalla VS */}
            <button
              onClick={onOpenCompare}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold font-mono transition-all ${
                compareHeroes.length > 0
                  ? 'bg-purple-950/60 border-purple-500 text-purple-300 shadow-md shadow-purple-600/30'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-purple-500/50'
              }`}
              title="Arena Versus [Atajo: V]"
              type="button"
            >
              <span>⚔️ VS</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-purple-500/30 text-purple-300 font-black">
                {compareHeroes.length}/2
              </span>
            </button>

            {/* Botón Mi Equipo */}
            <button
              onClick={onOpenTeam}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold font-mono transition-all ${
                teamCount > 0
                  ? 'bg-blue-950/60 border-blue-500 text-blue-300 shadow-md shadow-blue-600/30'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-blue-500/50'
              }`}
              title="Escuadrón del Multiverso [Atajo: E]"
              type="button"
            >
              <span>🛡️ Equipo</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-500/30 text-blue-300 font-black">
                {teamCount}/5
              </span>
            </button>

            {/* Botón Favoritos Toggle */}
            <button
              onClick={() => setShowOnlyFavorites((prev) => !prev)}
              type="button"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold font-mono transition-all ${
                showOnlyFavorites
                  ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/40'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:border-red-500/50'
              }`}
            >
              <span>❤️ Favs</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                  showOnlyFavorites ? 'bg-black/40 text-white' : 'bg-red-500/20 text-red-400'
                }`}
              >
                {favoritesCount}
              </span>
            </button>

            {/* Acciones y Atajos */}
            <div className="flex items-center gap-1 border-l border-neutral-800 pl-2">
              <button
                onClick={onOpenShortcuts}
                title="Atajos de Teclado [Atajo: ?]"
                className="p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-xl border border-neutral-800 text-xs font-mono"
                type="button"
              >
                ⌨️
              </button>
              <button
                onClick={handleSoundToggle}
                title={soundOn ? 'Desactivar efectos de sonido [Atajo: M]' : 'Activar efectos de sonido [Atajo: M]'}
                className="p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-xl border border-neutral-800 text-xs"
                type="button"
              >
                {soundOn ? '🔊' : '🔇'}
              </button>
              <button
                onClick={handleExport}
                title="Exportar base de datos a JSON"
                className="p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-xl border border-neutral-800 text-xs"
                type="button"
              >
                📥
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                title="Importar base de datos desde JSON"
                className="p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-xl border border-neutral-800 text-xs"
                type="button"
              >
                📤
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
