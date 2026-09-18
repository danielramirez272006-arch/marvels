<div align="center">

# 🕷️ SPIDER/VERSE — Multiverse Superhero Hub 🌌
**Laboratorio Universitario de Consumo de API, Analítica y Arquitectura Frontend Escalable**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black&style=for-the-badge)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white&style=for-the-badge)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css&logoColor=white&style=for-the-badge)](https://tailwindcss.com/)
[![Web Audio API](https://img.shields.io/badge/Web_Audio_API-Synthwave_Music_%26_FX-dc2626?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![HTML5 Canvas](https://img.shields.io/badge/HTML5_Canvas-PNG_Export-2563eb?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

<p align="center">
  Explora, analiza, crea variantes, compara y colecciona los superhéroes y villanos del Multiverso con diseño inmersivo inspirado en <i>Into the Spider-Verse</i>.
</p>

</div>

---

## 📑 Tabla de Contenidos

1. [Visión General](#-visión-general)
2. [Nuevas Funcionalidades Principales](#-nuevas-funcionalidades-principales)
3. [Arquitectura y Estructura del Proyecto](#-arquitectura-y-estructura-del-proyecto)
4. [Tecnologías y Estándares](#-tecnologías-y-estándares)
5. [Atajos de Teclado (Spider-Keybindings)](#-atajos-de-teclado-spider-keybindings)
6. [Instalación y Uso Local](#-instalación-y-uso-local)
7. [API Utilizada](#-api-utilizada)

---

## 🎯 Visión General

**Spider/Verse Hub** es una suite frontend completa diseñada para consumir la API pública de superhéroes (*Superhero API*). Proporciona herramientas avanzadas de análisis de estadísticas de poder, visualización gráfica en forma de telaraña (*Spiderweb Radar Chart*), un creador de variantes personalizadas, un salón de la fama con rankings, un dashboard analítico, modo de combate por turnos, sistema global de favoritos y escuadrón (*Team Builder*), minijuego de trivia interactivo y banda sonora Synthwave retro-sintetizada.

---

## ✨ Nuevas Funcionalidades Principales

### 🧬 1. Creador de Variantes Arácnidas (Custom Hero Creator)
* **Formulario interactivo:** Crea tu propio personaje con nombre, identidad secreta, editorial y bando.
* **Sliders de Atributos:** Distribuye puntos de estadísticas (0 a 100) en tiempo real con previsualización dinámica del **Gráfico de Radar SVG**.
* **Integración Total:** La variante creada se almacena en `localStorage` y aparece en el directorio general, participa en la Arena Versus, en el Escuadrón y en la Trivia.

### 🏆 2. Salón de la Fama / Leaderboard (Top 10 Rankings)
* 🥇 **Top 10 Seres Supremos:** Clasificación de los personajes más poderosos del Multiverso con podio dorado, plateado y bronce.
* **Campeones por Atributo:** Rankings individuales de *Mayor Fuerza*, *Velocidad Extrema*, *Inteligencia Superior* y *Maestría en Combate*.
* Acceso directo para retar a cualquier campeón en la **Arena de Batalla**.

### 📊 3. Dashboard de Analítica Global del Multiverso
* Métricas demográficas sobre los cientos de entidades analizadas:
  - Distribución porcentual entre **Héroes, Villanos y Neutrales**.
  - Gráfico de barras de las **Top Editoriales** (*Marvel, DC, Dark Horse, etc.*).
  - Promedio global de habilidades del cosmos.

### 🎵 4. Banda Sonora Synthwave & Audio Web API
* **Música Ambiental:** Generador de arpegios Synthwave Lo-Fi sintetizado en tiempo real con `AudioContext` nativo (conmutador Play/Pausa en Header).
* **Efectos de Sonido:** Sonido de telaraña *¡Thwip!*, pulsos dimensionales, golpes de combate y fanfarrias.

### 🔍 5. Directorio y Filtrado Multidimensional
* **Búsqueda en tiempo real:** Filtrado reactivo por nombre, alter ego y editorial.
* **Filtros Avanzados:** Por editorial, bando y género.
* **Ordenamiento Dinámico:** Alfabético (A-Z / Z-A), Poder Total Acumulado, Fuerza, Velocidad e Inteligencia.
* **Modo Grid ▦ vs Tabla ☰:** Alterna entre tarjetas visuales y una tabla compacta con todas las estadísticas.

### 🕸️ 6. Ficha Técnica y Gráfica de Telaraña (Radar SVG)
* **Gráfica de Telaraña Poligonal (SVG):** Visualización trigonométrica de los 6 atributos.
* **📸 Descarga de Tarjeta Coleccionable (PNG):** Renderiza proceduralmente con `HTML5 Canvas` una tarjeta coleccionable en alta resolución.

### ⚔️ 7. Arena Versus & Simulador de Combate RPG
* Comparador cara a cara de 2 personajes con gráficas de telaraña superpuestas (Rojo vs Azul).
* **Simulador por Turnos:** Barras de vida (HP), evasiones por velocidad, golpes críticos y registro de combate en vivo.

### 🛡️ 8. Escuadrón del Multiverso & Favoritos
* **Team Builder (Máximo 5):** Ensambla tu escuadrón, calcula el promedio de poder y asigna rangos (*Nivel Cósmico, Escuadrón Omega, etc.*).
* **Exportar / Importar:** Descarga y restaura tu base de datos y equipos en formato `.json`.

### 🎮 9. Minijuego: Trivia del Multiverso
* Partidas con **Sistema de 3 Vidas (`❤️❤️❤️`)**, temporizador de 12s, imágenes HD, multiplicador de rachas (*Combos 🔥*) y récord histórico.

---

## ⌨️ Atajos de Teclado (*Spider-Keybindings*)

| Tecla | Acción |
| :---: | :--- |
| <kbd>/</kbd> | Enfocar la barra de búsqueda inmediatamente |
| <kbd>C</kbd> | Abrir el Creador de Variantes Arácnidas |
| <kbd>L</kbd> | Abrir el Salón de la Fama (Leaderboard) |
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
│   │   ├── analytics/
│   │   │   └── AnalyticsModal.jsx    # Dashboard de analítica y métricas globales
│   │   ├── heroes/
│   │   │   ├── BattleSimulator.jsx   # Simulador de combate RPG por turnos
│   │   │   ├── CompareModal.jsx      # Modal Arena Versus (cara a cara)
│   │   │   ├── CustomHeroModal.jsx   # Creador de variantes de superhéroes
│   │   │   ├── FilterBar.jsx         # Barra de filtros, orden y vistas
│   │   │   ├── HeroCard.jsx          # Tarjeta interactiva de personaje
│   │   │   ├── HeroModal.jsx         # Ficha técnica y radar de stats
│   │   │   ├── HeroTableView.jsx     # Vista tabular interactiva
│   │   │   ├── LeaderboardModal.jsx  # Salón de la fama y Top 10 rankings
│   │   │   ├── SearchBar.jsx         # Input de búsqueda reactivo
│   │   │   └── TeamDrawer.jsx        # Cajón del Escuadrón (Team Builder)
│   │   ├── layout/
│   │   │   ├── Footer.jsx            # Pie de página temático
│   │   │   └── Header.jsx            # Barra superior con accesos rápidos y música
│   │   ├── trivia/
│   │   │   └── TriviaModal.jsx       # Minijuego arcade de preguntas con 3 vidas
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
│   │   └── useHeroes.js              # Custom hook con API y variantes custom
│   ├── pages/
│   │   └── HomePage.jsx              # Orquestador principal de vistas
│   ├── services/
│   │   └── api.js                    # Consumo de la API Superhero
│   ├── utils/
│   │   ├── cardGenerator.js          # Exportador Canvas a imagen PNG
│   │   └── soundEffects.js           # Sintetizador Web Audio API & Synthwave
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
* **Web Audio API:** Síntesis sonora nativa de efectos y banda sonora Synthwave.

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
