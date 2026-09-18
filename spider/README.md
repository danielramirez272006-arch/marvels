<div align="center">

# 🕷️ SPIDER/VERSE — Multiverse Superhero Hub 🌌
**Laboratorio Universitario de Consumo de API y Arquitectura Frontend Escalable**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black&style=for-the-badge)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white&style=for-the-badge)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css&logoColor=white&style=for-the-badge)](https://tailwindcss.com/)
[![Web Audio API](https://img.shields.io/badge/Web_Audio_API-Native_FX-dc2626?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![HTML5 Canvas](https://img.shields.io/badge/HTML5_Canvas-PNG_Export-2563eb?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

<p align="center">
  Explora, analiza, compara y colecciona los superhéroes y villanos del Multiverso con diseño inmersivo inspirado en <i>Into the Spider-Verse</i>.
</p>

</div>

---

## 📑 Tabla de Contenidos

1. [Visión General](#-visión-general)
2. [Funcionalidades Principales](#-funcionalidades-principales)
3. [Arquitectura y Estructura del Proyecto](#-arquitectura-y-estructura-del-proyecto)
4. [Tecnologías y Estándares](#-tecnologías-y-estándares)
5. [Atajos de Teclado (Spider-Keybindings)](#-atajos-de-teclado-spider-keybindings)
6. [Instalación y Uso Local](#-instalación-y-uso-local)
7. [API Utilizada](#-api-utilizada)

---

## 🎯 Visión General

**Spider/Verse Hub** es una solución frontend integral diseñada para consumir la API pública de superhéroes (*Superhero API*). Proporciona herramientas avanzadas de análisis de estadísticas de poder, visualización gráfica en forma de telaraña (*Spiderweb Radar Chart*), un modo de combate por turnos, un sistema global de favoritos y escuadrón (*Team Builder*), y un minijuego de trivia interactivo con efectos de sonido sintéticos.

---

## ✨ Funcionalidades Principales

### 🔍 1. Directorio y Filtrado Multidimensional
* **Búsqueda en tiempo real:** Filtrado reactivo por nombre de héroe, identidad secreta (*alter ego*) y editorial.
* **Filtros por Editorial:** Chips dinámicos (*Marvel Comics, DC Comics, Dark Horse Comics, etc.*).
* **Filtros por Bando y Género:** Clasificación entre Héroes (`good`), Villanos (`bad`), Neutrales y Género.
* **Ordenamiento:** Alfabético (A-Z / Z-A), Poder Total Acumulado, Fuerza Extrema, Velocidad Máxima y Mayor Inteligencia.
* **Doble Modo de Visualización:** Alterna entre vista de **Cuadrícula de Tarjetas (Grid ▦)** y **Tabla Comparativa Detallada (Table ☰)**.

---

### 🕸️ 2. Ficha Técnica y Gráfica de Telaraña (Radar SVG)
* **Modal Flotante:** Con fondo desenfocado (`backdrop-blur`) y detalles biográficos completos (*raza, lugar de nacimiento, primera aparición, ocupación*).
* **Gráfica de Telaraña Poligonal (SVG):** Visualización trigonométrica nativa de los 6 atributos: *Inteligencia, Fuerza, Velocidad, Durabilidad, Poder y Combate*.
* **📸 Descarga de Tarjeta Coleccionable (PNG):** Renderiza con `HTML5 Canvas` una tarjeta coleccionable en alta resolución con marco neón y estadísticas para guardarla en el dispositivo.

---

### ⚔️ 3. Arena Versus & Simulador de Combate RPG
* **Comparador de Poder:** Enfrentamiento cara a cara de 2 personajes con gráficas de telaraña superpuestas (Rojo vs Azul) y cálculo de ganador.
* **Simulador por Turnos:**
  - Puntos de vida (HP) dinámicos calculados a partir de la durabilidad y fuerza.
  - Probabilidad de esquive basada en la velocidad relativa.
  - Golpes críticos y reducción de daño por armadura.
  - Registro de combate (*Combat Log*) con efectos de sonido de golpes y victoria.

---

### 🛡️ 4. Escuadrón del Multiverso & Favoritos
* **Colección de Favoritos:** Guardado automático y persistente en `localStorage`.
* **Team Builder (Máximo 5):** Permite ensamblar un escuadrón, calculando el promedio de poder y asignando rangos (*Nivel Cósmico, Escuadrón Omega, Defensores*).
* **Exportar / Importar:** Descarga y restaura tu base de datos y equipos en formato `.json`.

---

### 🎮 5. Minijuego: Trivia del Multiverso
* Partidas dinámicas con **Sistema de 3 Vidas (`❤️❤️❤️`)** y temporizador de 12 segundos.
* 4 Modos de preguntas:
  1. 👤 *Silueta Misteriosa* (con efecto de revelación al responder).
  2. 🧬 *Identidad Secreta* (adivina el nombre real).
  3. 🏢 *Origen Editorial*.
  4. ⚡ *Duelo de Atributos* (con miniaturas de los 4 candidatos).
* Multiplicador de rachas (*Combos 🔥*) y récord de puntuación (*High Score*).

---

### 🌌 6. Dimensiones Visuales (Themes) & Audio Web API
* **4 Skins del Multiverso:**
  - 🕷️ **Peter Parker** *(Rojo clásico y Azul cósmico)*
  - ⚡ **Miles Morales** *(Negro mate, Neón Rojo y Fucsia)*
  - 🧬 **Spider-Gwen** *(Blanco/Gris perla, Rosa neón y Turquesa)*
  - 🖤 **Symbiote** *(Venom / Púrpura eléctrico)*
* **Efectos de Audio Sintéticos:** Disparo de telaraña (*¡Thwip!*), pulso dimensional y fanfarria generados mediante `AudioContext` nativo (sin archivos externos).

---

## ⌨️ Atajos de Teclado (*Spider-Keybindings*)

| Tecla | Acción |
| :---: | :--- |
| <kbd>/</kbd> | Enfocar la barra de búsqueda inmediatamente |
| <kbd>T</kbd> | Abrir el minijuego de Trivia |
| <kbd>V</kbd> | Abrir la Arena Versus / Comparador |
| <kbd>E</kbd> | Abrir el Escuadrón del Multiverso |
| <kbd>R</kbd> | Salto Dimensional (Héroe Aleatorio) |
| <kbd>M</kbd> | Silenciar / Activar efectos de sonido |
| <kbd>?</kbd> | Ver el panel de atajos de teclado |
| <kbd>Esc</kbd> | Cerrar cualquier modal abierto |

---

## 📂 Arquitectura y Estructura del Proyecto

```text
spider/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── heroes/
│   │   │   ├── BattleSimulator.jsx   # Simulador de combate por turnos
│   │   │   ├── CompareModal.jsx      # Modal Arena Versus (cara a cara)
│   │   │   ├── FilterBar.jsx         # Barra de filtros, orden y vistas
│   │   │   ├── HeroCard.jsx          # Tarjeta de personaje
│   │   │   ├── HeroModal.jsx         # Ficha técnica y radar de stats
│   │   │   ├── HeroTableView.jsx     # Vista tabular interactiva
│   │   │   ├── SearchBar.jsx         # Input de búsqueda reactivo
│   │   │   └── TeamDrawer.jsx        # Cajón del Escuadrón (Team Builder)
│   │   ├── layout/
│   │   │   ├── Footer.jsx            # Pie de página temático
│   │   │   └── Header.jsx            # Barra superior con accesos rápidos
│   │   ├── trivia/
│   │   │   └── TriviaModal.jsx       # Minijuego arcade de preguntas
│   │   └── ui/
│   │       ├── Loader.jsx            # Spinner animado Spider-Verse
│   │       ├── Pagination.jsx        # Paginación matemática
│   │       ├── RadarChart.jsx        # Gráfica de telaraña poligonal SVG
│   │       ├── ShortcutsModal.jsx    # Guía de atajos de teclado
│   │       ├── SkeletonCard.jsx      # Placeholders de carga (shimmer)
│   │       └── ToastContainer.jsx    # Alertas flotantes (Spider-Sense)
│   ├── context/
│   │   ├── FavoritesContext.jsx      # Estado de favoritos, equipo y versus
│   │   ├── ThemeContext.jsx          # Selector de temas/skins del multiverso
│   │   └── ToastContext.jsx          # Sistema de notificaciones
│   ├── hooks/
│   │   └── useHeroes.js              # Custom hook de fetching, filtro y paginación
│   ├── pages/
│   │   └── HomePage.jsx              # Orquestador principal de vistas
│   ├── services/
│   │   └── api.js                    # Consumo de la API Superhero
│   ├── utils/
│   │   ├── cardGenerator.js          # Exportador Canvas a imagen PNG
│   │   └── soundEffects.js           # Sintetizador Web Audio API
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 🛠️ Tecnologías Utilizadas

* **[React 19](https://react.dev/):** Biblioteca frontend para renderizado declarativo y Hooks modernos (`useMemo`, `useCallback`, `useContext`, `useState`, `useEffect`).
* **[Vite 8](https://vite.dev/):** Entorno de compilación ultra rápido con Hot Module Replacement (HMR).
* **[Tailwind CSS 4](https://tailwindcss.com/):** Framework de estilos utilitarios con `@tailwindcss/vite`.
* **HTML5 Canvas:** Generación procedural de tarjetas coleccionables en PNG.
* **Web Audio API:** Síntesis sonora nativa en el navegador.

---

## 🚀 Instalación y Puesta en Marcha

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/danielramirez272006-arch/marvels.git
   ```

2. **Ingresar al directorio del proyecto e instalar dependencias:**
   ```bash
   cd spider
   npm install
   ```

3. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 📡 API Utilizada

Este proyecto utiliza los datos abiertos de **[Akabab Superhero API](https://akabab.github.io/superhero-api/api/)**:
* Endpoint general: `https://akabab.github.io/superhero-api/api/all.json`

---

<div align="center">
  <b>Desarrollado con ❤️ y sentido arácnido para el Laboratorio de API</b>
</div>
