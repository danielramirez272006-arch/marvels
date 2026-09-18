// src/context/FavoritesContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const FavoritesContext = createContext();

const FAVORITES_STORAGE_KEY = 'spider_hero_favorites';
const TEAM_STORAGE_KEY = 'spider_hero_team';

export const FavoritesProvider = ({ children }) => {
  // 1. FAVORITOS
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
      return [];
    }
  });

  // 2. ESCUADRÓN (TEAM BUILDER - MAX 5)
  const [team, setTeam] = useState(() => {
    try {
      const stored = localStorage.getItem(TEAM_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error al cargar equipo:', error);
      return [];
    }
  });

  // 3. COMPARADOR (VERSUS ARENA - MAX 2)
  const [compareHeroes, setCompareHeroes] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Persistir favoritos
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error al guardar favoritos:', error);
    }
  }, [favorites]);

  // Persistir equipo
  useEffect(() => {
    try {
      localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(team));
    } catch (error) {
      console.error('Error al guardar equipo:', error);
    }
  }, [team]);

  // Métodos de Favoritos
  const toggleFavorite = (hero) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === hero.id);
      if (exists) {
        return prev.filter((item) => item.id !== hero.id);
      }
      return [...prev, hero];
    });
  };

  const isFavorite = (heroId) => favorites.some((item) => item.id === heroId);
  const clearFavorites = () => setFavorites([]);

  // Métodos de Equipo (Máximo 5)
  const addToTeam = (hero) => {
    if (team.some((h) => h.id === hero.id)) {
      setTeam((prev) => prev.filter((h) => h.id !== hero.id));
      return { success: true, message: `${hero.name} retirado del equipo.` };
    }
    if (team.length >= 5) {
      return { success: false, message: 'El equipo ya tiene el límite máximo de 5 héroes.' };
    }
    setTeam((prev) => [...prev, hero]);
    return { success: true, message: `${hero.name} reclutado al equipo!` };
  };

  const removeFromTeam = (heroId) => {
    setTeam((prev) => prev.filter((h) => h.id !== heroId));
  };

  const isInTeam = (heroId) => team.some((h) => h.id === heroId);
  const clearTeam = () => setTeam([]);

  // Estadísticas promedio del equipo
  const teamPowerAverage = useMemo(() => {
    if (team.length === 0) return 0;
    const total = team.reduce((acc, h) => {
      const stats = h.powerstats || {};
      const sum =
        (stats.intelligence || 0) +
        (stats.strength || 0) +
        (stats.speed || 0) +
        (stats.durability || 0) +
        (stats.power || 0) +
        (stats.combat || 0);
      return acc + Math.round(sum / 6);
    }, 0);
    return Math.round(total / team.length);
  }, [team]);

  // Métodos de Comparador (Versus)
  const toggleCompare = (hero) => {
    setCompareHeroes((prev) => {
      const exists = prev.some((h) => h.id === hero.id);
      if (exists) {
        return prev.filter((h) => h.id !== hero.id);
      }
      if (prev.length >= 2) {
        // Reemplazar el segundo
        return [prev[0], hero];
      }
      return [...prev, hero];
    });
  };

  const isComparing = (heroId) => compareHeroes.some((h) => h.id === heroId);
  const clearCompare = () => setCompareHeroes([]);

  // Exportar / Importar
  const exportData = () => {
    const payload = {
      favorites,
      team,
      exportedAt: new Date().toISOString(),
      app: 'Spider-Verse Multiverse Hub',
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `spider_multiverse_data_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (jsonData) => {
    try {
      const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      if (Array.isArray(data.favorites)) {
        setFavorites(data.favorites);
      }
      if (Array.isArray(data.team)) {
        setTeam(data.team.slice(0, 5));
      }
      return { success: true, message: 'Datos del Multiverso importados exitosamente.' };
    } catch (err) {
      return { success: false, message: 'Error al procesar el archivo JSON: ' + err.message };
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        favoritesCount: favorites.length,
        team,
        addToTeam,
        removeFromTeam,
        isInTeam,
        clearTeam,
        teamCount: team.length,
        teamPowerAverage,
        compareHeroes,
        toggleCompare,
        isComparing,
        clearCompare,
        isCompareModalOpen,
        setIsCompareModalOpen,
        exportData,
        importData,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe ser utilizado dentro de un FavoritesProvider');
  }
  return context;
};
