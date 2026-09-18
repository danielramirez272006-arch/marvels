// src/context/ThemeContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const THEME_STORAGE_KEY = 'spider_multiverse_theme';

export const THEMES = [
  {
    id: 'peter',
    name: 'Peter Parker (Clásico)',
    primary: 'from-red-600 to-blue-600',
    accentColor: '#dc2626',
    secondaryColor: '#2563eb',
    icon: '🕷️',
  },
  {
    id: 'miles',
    name: 'Miles Morales (Spider-Verse)',
    primary: 'from-red-600 to-rose-600',
    accentColor: '#e11d48',
    secondaryColor: '#000000',
    icon: '⚡',
  },
  {
    id: 'gwen',
    name: 'Spider-Gwen (Ghost-Spider)',
    primary: 'from-pink-500 to-cyan-400',
    accentColor: '#ec4899',
    secondaryColor: '#06b6d4',
    icon: '🧬',
  },
  {
    id: 'symbiote',
    name: 'Symbiote (Venom)',
    primary: 'from-purple-600 to-indigo-700',
    accentColor: '#9333ea',
    secondaryColor: '#4f46e5',
    icon: '🖤',
  },
];

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      return stored ? JSON.parse(stored) : THEMES[0];
    } catch {
      return THEMES[0];
    }
  });

  const setTheme = (themeId) => {
    const found = THEMES.find((t) => t.id === themeId) || THEMES[0];
    setCurrentTheme(found);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(found));
    } catch {}
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme.id);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser utilizado dentro de un ThemeProvider');
  }
  return context;
};
