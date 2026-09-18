// src/App.jsx
import React from 'react';
import './App.css';
import { FavoritesProvider } from './context/FavoritesContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import HomePage from './pages/HomePage';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <FavoritesProvider>
          <HomePage />
        </FavoritesProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
