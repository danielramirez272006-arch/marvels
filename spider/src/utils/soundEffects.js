// src/utils/soundEffects.js
/**
 * Generador de efectos de sonido y música de fondo sintética usando Web Audio API.
 * 100% nativo en el navegador, sin dependencias ni archivos externos.
 */

let audioCtx = null;
let soundEnabled = true;
let bgMusicPlaying = false;
let musicInterval = null;

try {
  const stored = localStorage.getItem('spider_sound_enabled');
  if (stored !== null) {
    soundEnabled = JSON.parse(stored);
  }
} catch (e) {
  soundEnabled = true;
}

const getAudioContext = () => {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const isSoundEnabled = () => soundEnabled;

export const toggleSound = () => {
  soundEnabled = !soundEnabled;
  try {
    localStorage.setItem('spider_sound_enabled', JSON.stringify(soundEnabled));
  } catch (e) {}
  if (!soundEnabled && bgMusicPlaying) {
    stopBackgroundMusic();
  }
  return soundEnabled;
};

// FX 1: Disparo de Telaraña "Thwip!"
export const playThwip = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const now = ctx.currentTime;

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(120, now + 0.15);

  gain.gain.setValueAtTime(0.3, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.15);
};

// FX 2: Pulso Dimensional / Glitch
export const playGlitch = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const now = ctx.currentTime;

  osc.type = 'square';
  osc.frequency.setValueAtTime(300, now);
  osc.frequency.setValueAtTime(600, now + 0.05);
  osc.frequency.setValueAtTime(200, now + 0.1);

  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.2);
};

// FX 3: Golpe de Combate
export const playHit = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const now = ctx.currentTime;

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(150, now);
  osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);

  gain.gain.setValueAtTime(0.4, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.12);
};

// FX 4: Fanfarria de Victoria
export const playVictory = () => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.5];
  const now = ctx.currentTime;

  notes.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const startTime = now + index * 0.08;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.2, startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.25);
  });
};

// --- MÚSICA AMBIENTAL SYNTHWAVE MULTIVERSE ---
const synthNotes = [110, 130.81, 164.81, 196, 220, 196, 164.81, 130.81]; // Bassline arpeggio
let currentNoteIndex = 0;

export const isMusicPlaying = () => bgMusicPlaying;

export const startBackgroundMusic = () => {
  if (!soundEnabled) return false;
  const ctx = getAudioContext();
  if (!ctx) return false;

  bgMusicPlaying = true;

  if (musicInterval) clearInterval(musicInterval);

  musicInterval = setInterval(() => {
    if (!bgMusicPlaying || !soundEnabled) return;
    const now = ctx.currentTime;
    const freq = synthNotes[currentNoteIndex % synthNotes.length];
    currentNoteIndex++;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, now);

    // Filtro pasa-bajos para textura cálida Synthwave
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, now);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.22);
  }, 240);

  return true;
};

export const stopBackgroundMusic = () => {
  bgMusicPlaying = false;
  if (musicInterval) {
    clearInterval(musicInterval);
    musicInterval = null;
  }
  return false;
};

export const toggleBackgroundMusic = () => {
  if (bgMusicPlaying) {
    return stopBackgroundMusic();
  } else {
    return startBackgroundMusic();
  }
};
