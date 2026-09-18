// src/components/ui/Pagination.jsx
import React from 'react';

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalResults,
  itemsPerPage,
}) => {
  if (totalPages <= 1) return null;

  // Generar rango de botones de páginas
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalResults);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 px-4 border-t border-neutral-800/80 my-8">
      {/* Información de elementos */}
      <div className="text-xs sm:text-sm text-neutral-400 font-mono">
        Mostrando <span className="text-red-400 font-semibold">{startItem}</span> -{' '}
        <span className="text-blue-400 font-semibold">{endItem}</span> de{' '}
        <span className="text-white font-bold">{totalResults}</span> héroes
      </div>

      {/* Controles de paginación */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        {/* Botón Anterior */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold uppercase rounded-lg border border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:text-white hover:border-red-500 hover:bg-red-950/40 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200"
        >
          &larr; Prev
        </button>

        {/* Primera página si está lejos */}
        {currentPage > 3 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm font-bold rounded-lg border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
            >
              1
            </button>
            <span className="text-neutral-600 px-1">...</span>
          </>
        )}

        {/* Lista de páginas */}
        {getPageNumbers().map((page) => {
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-lg shadow-red-600/30 scale-105 border border-red-400/50'
                  : 'bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 hover:bg-neutral-800'
              }`}
            >
              {page}
            </button>
          );
        })}

        {/* Última página si está lejos */}
        {currentPage < totalPages - 2 && (
          <>
            <span className="text-neutral-600 px-1">...</span>
            <button
              onClick={() => onPageChange(totalPages)}
              className="w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm font-bold rounded-lg border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Botón Siguiente */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold uppercase rounded-lg border border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:text-white hover:border-blue-500 hover:bg-blue-950/40 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200"
        >
          Sig &rarr;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
