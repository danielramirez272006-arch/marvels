// src/services/api.js
const API_URL = 'https://akabab.github.io/superhero-api/api/all.json';

/**
 * Obtiene la lista completa de superhéroes desde la API pública.
 * @returns {Promise<Array>} Array con los datos de todos los superhéroes.
 */
export const fetchHeroes = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los superhéroes:', error);
    throw error;
  }
};
