// src/hooks/useHeroes.js
import { useEffect, useMemo, useState } from 'react';
import { fetchHeroes } from '../services/api';

export const useHeroes = (itemsPerPage = 12) => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtros y orden
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPublisher, setSelectedPublisher] = useState('ALL');
  const [selectedAlignment, setSelectedAlignment] = useState('ALL');
  const [selectedGender, setSelectedGender] = useState('ALL');
  const [sortBy, setSortBy] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);

  // Carga inicial
  useEffect(() => {
    let isMounted = true;

    const loadHeroes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchHeroes();
        if (isMounted) {
          setHeroes(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Error desconocido al conectar con la API.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadHeroes();

    return () => {
      isMounted = false;
    };
  }, []);

  // Lista única de Editoriales más comunes
  const availablePublishers = useMemo(() => {
    const counts = {};
    heroes.forEach((h) => {
      const pub = h.biography?.publisher;
      if (pub) {
        counts[pub] = (counts[pub] || 0) + 1;
      }
    });

    // Ordenar por cantidad y tomar los más relevantes
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([pub]) => pub);
  }, [heroes]);

  // Cálculo del Poder Total de un héroe
  const calculateTotalPower = (hero) => {
    const stats = hero.powerstats || {};
    return (
      (stats.intelligence || 0) +
      (stats.strength || 0) +
      (stats.speed || 0) +
      (stats.durability || 0) +
      (stats.power || 0) +
      (stats.combat || 0)
    );
  };

  // Filtrado y Ordenamiento Combinado
  const filteredHeroes = useMemo(() => {
    let result = [...heroes];

    // 1. Filtro por término de búsqueda
    const term = searchTerm.trim().toLowerCase();
    if (term) {
      result = result.filter((hero) => {
        const nameMatch = hero.name?.toLowerCase().includes(term);
        const fullNameMatch = hero.biography?.fullName?.toLowerCase().includes(term);
        const publisherMatch = hero.biography?.publisher?.toLowerCase().includes(term);
        return nameMatch || fullNameMatch || publisherMatch;
      });
    }

    // 2. Filtro por Editorial
    if (selectedPublisher !== 'ALL') {
      result = result.filter((hero) => hero.biography?.publisher === selectedPublisher);
    }

    // 3. Filtro por Bando (Alineación)
    if (selectedAlignment !== 'ALL') {
      result = result.filter((hero) => (hero.biography?.alignment || 'neutral') === selectedAlignment);
    }

    // 4. Filtro por Género
    if (selectedGender !== 'ALL') {
      result = result.filter((hero) => (hero.appearance?.gender || '-') === selectedGender);
    }

    // 5. Ordenamiento
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return (a.name || '').localeCompare(b.name || '');
        case 'name-desc':
          return (b.name || '').localeCompare(a.name || '');
        case 'power-desc':
          return calculateTotalPower(b) - calculateTotalPower(a);
        case 'power-asc':
          return calculateTotalPower(a) - calculateTotalPower(b);
        case 'strength-desc':
          return (b.powerstats?.strength || 0) - (a.powerstats?.strength || 0);
        case 'speed-desc':
          return (b.powerstats?.speed || 0) - (a.powerstats?.speed || 0);
        case 'intelligence-desc':
          return (b.powerstats?.intelligence || 0) - (a.powerstats?.intelligence || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [heroes, searchTerm, selectedPublisher, selectedAlignment, selectedGender, sortBy]);

  // Reiniciar página al cambiar filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedPublisher, selectedAlignment, selectedGender, sortBy]);

  // Cálculos matemáticos de paginación
  const totalResults = filteredHeroes.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const paginatedHeroes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredHeroes.slice(startIndex, endIndex);
  }, [filteredHeroes, currentPage, itemsPerPage]);

  const goToPage = (page) => {
    const targetPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(targetPage);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedPublisher('ALL');
    setSelectedAlignment('ALL');
    setSelectedGender('ALL');
    setSortBy('name-asc');
    setCurrentPage(1);
  };

  // Salto al Multiverso: Obtener un héroe aleatorio
  const getRandomHero = () => {
    if (heroes.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * heroes.length);
    return heroes[randomIndex];
  };

  return {
    heroes,
    filteredHeroes,
    paginatedHeroes,
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
    currentPage,
    totalPages,
    totalResults,
    itemsPerPage,
    goToPage,
    nextPage,
    prevPage,
    calculateTotalPower,
  };
};
