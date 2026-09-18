# 🕷️ SPIDER/VERSE — Multiverse Superhero Hub

Aplicación web interactiva y modular desarrollada con **React 19**, **Vite** y **Tailwind CSS** para el consumo y análisis de superhéroes y villanos a través de la API abierta de Superheroes (`Superhero API`).

---

## 🚀 Características Principales

### 1. 🔍 Directorio y Consumo de API
- Consumo asíncrono con `fetch` y `async/await` de la base de datos completa de superhéroes.
- Búsqueda en tiempo real por nombre de héroe, identidad secreta o editorial.
- Paginación matemática configurable desde el frontend.
- Filtros avanzados por **Editorial** (*Marvel Comics, DC Comics, Dark Horse, etc.*), **Bando / Alineación** (*Héroes, Villanos, Neutrales*) y **Género**.
- Ordenamiento dinámico: Alfabético (A-Z / Z-A), Poder Total, Fuerza, Velocidad e Inteligencia.
- Vista alternable entre **Cuadrícula de Tarjetas (Grid)** y **Tabla Comparativa (Table View)**.

### 2. 🕸️ Ficha Técnica & Gráfico de Radar SVG
- Modal con diseño flotante con `backdrop-blur`.
- Ficha biográfica con rasgos físicos, lugar de nacimiento, primera aparición y ocupación.
- **Gráfico de Radar / Telaraña Poligonal** generado en SVG nativo con 6 ejes trigonométricos (*Inteligencia, Fuerza, Velocidad, Durabilidad, Poder y Combate*).
- **📸 Descargador de Tarjetas Coleccionables en PNG:** Genera y descarga una tarjeta coleccionable en alta resolución mediante `HTML5 Canvas`.

### 3. ⚔️ Arena de Batalla (Versus Mode) & Simulador por Turnos
- Comparador cara a cara de 2 personajes con gráfico de radar superpuesto (Rojo vs Azul) y cálculo de ganador.
- **Simulador de Combate RPG por Turnos:** Barras de vida (HP) dinámicas, cálculo de daño, evasiones basadas en velocidad, golpes críticos por combate y registro de eventos (*Combat Log*) en tiempo real.

### 4. 🛡️ Escuadrón del Multiverso & Sistema de Favoritos
- **Colección de Favoritos:** Guardado persistente en `localStorage`.
- **Team Builder:** Recluta hasta 5 héroes en tu equipo, calculando el poder promedio del escuadrón y su rango (*Nivel Cósmico, Escuadrón Omega, Defensores, etc.*).
- **Exportación e Importación:** Descarga y restaura tu base de datos en archivos `.json`.

### 5. 🎮 Minijuego: Trivia del Multiverso
- Juego contrarreloj (12 segundos por pregunta).
- Modos de pregunta: *Silueta Oculta* (con efecto de revelación), *Identidad Secreta*, *Editorial* y *Duelo de Estadísticas*.
- Sistema de **3 Vidas**, multiplicador de rachas (*Combos*) y récord histórico (*High Score*).

### 6. 🌌 Skins del Multiverso & Efectos de Sonido
- 4 Temas visuales: **Peter Parker** (Clásico), **Miles Morales** (Spider-Verse), **Spider-Gwen** (Ghost-Spider) y **Symbiote** (Venom).
- Efectos de sonido sintetizados nativamente con la **Web Audio API** (*¡Thwip!*, pulsos dimensionales, golpes y fanfarria de victoria).

---

## ⌨️ Atajos de Teclado (*Spider-Keybindings*)

| Tecla | Acción |
| :---: | :--- |
| <kbd>/</kbd> | Enfocar la barra de búsqueda |
| <kbd>T</kbd> | Abrir el minijuego de Trivia |
| <kbd>V</kbd> | Abrir la Arena Versus / Comparador |
| <kbd>E</kbd> | Abrir el Escuadrón del Multiverso |
| <kbd>R</kbd> | Salto Dimensional (Héroe Aleatorio) |
| <kbd>M</kbd> | Silenciar / Activar sonido sintético |
| <kbd>?</kbd> | Ver modal de atajos de teclado |
| <kbd>Esc</kbd> | Cerrar cualquier modal activo |

---

## 📂 Arquitectura del Proyecto

```text
spider/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── heroes/
│   │   │   ├── BattleSimulator.jsx
│   │   │   ├── CompareModal.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── HeroCard.jsx
│   │   │   ├── HeroModal.jsx
│   │   │   ├── HeroTableView.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── TeamDrawer.jsx
│   │   ├── layout/
│   │   │   ├── Footer.jsx
│   │   │   └── Header.jsx
│   │   ├── trivia/
│   │   │   └── TriviaModal.jsx
│   │   └── ui/
│   │       ├── Loader.jsx
│   │       ├── Pagination.jsx
│   │       ├── RadarChart.jsx
│   │       ├── ShortcutsModal.jsx
│   │       ├── SkeletonCard.jsx
│   │       └── ToastContainer.jsx
│   ├── context/
│   │   ├── FavoritesContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── ToastContext.jsx
│   ├── hooks/
│   │   └── useHeroes.js
│   ├── pages/
│   │   └── HomePage.jsx
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   ├── cardGenerator.js
│   │   └── soundEffects.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 🛠️ Instalación y Puesta en Marcha

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/danielramirez272006-arch/marvels.git
   ```

2. Entrar a la carpeta del proyecto e instalar dependencias:
   ```bash
   cd spider
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Compilar para producción:
   ```bash
   npm run build
   ```

---

## 📄 Licencia
Proyecto desarrollado con fines académicos y de demostración de arquitectura React moderna.
