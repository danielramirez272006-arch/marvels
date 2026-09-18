// src/components/trivia/TriviaModal.jsx
import React, { useEffect, useState } from 'react';
import { playHit, playVictory } from '../../utils/soundEffects';

const HIGH_SCORE_KEY = 'spider_trivia_high_score';

export const TriviaModal = ({ isOpen, onClose, heroes = [] }) => {
  // Solo héroes que tengan imagen válida y estadísticas
  const validHeroes = heroes.filter((h) => h.images?.sm || h.images?.md || h.images?.lg);

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(12);
  const [highScore, setHighScore] = useState(() => {
    try {
      return Number(localStorage.getItem(HIGH_SCORE_KEY)) || 0;
    } catch {
      return 0;
    }
  });

  const generateQuestion = () => {
    if (validHeroes.length < 4) return;

    setIsAnswered(false);
    setSelectedOption(null);
    setTimeLeft(12);

    // Barajar héroes
    const shuffled = [...validHeroes].sort(() => 0.5 - Math.random());
    const targetHero = shuffled[0];
    const optionPool = shuffled.slice(0, 4);

    const questionModes = ['silhouette', 'realName', 'publisher', 'highestStat'];
    const mode = questionModes[Math.floor(Math.random() * questionModes.length)];

    let questionText = '';
    let choices = [];
    let imageToShow = targetHero.images?.md || targetHero.images?.sm;
    let isSilhouette = false;

    if (mode === 'silhouette') {
      isSilhouette = true;
      questionText = '¿A qué superhéroe o villano pertenece esta silueta dimensional?';
      choices = optionPool.map((h) => ({
        id: h.id,
        label: h.name,
        image: h.images?.sm,
        isCorrect: h.id === targetHero.id,
      }));
    } else if (mode === 'realName') {
      questionText = `¿Cuál es el nombre real / alter ego de ${targetHero.name}?`;
      choices = optionPool.map((h) => ({
        id: h.id,
        label: h.biography?.fullName && h.biography.fullName !== '-' ? h.biography.fullName : h.name,
        image: null,
        isCorrect: h.id === targetHero.id,
      }));
    } else if (mode === 'publisher') {
      questionText = `¿A qué editorial o universo pertenece ${targetHero.name}?`;
      const allPubs = ['Marvel Comics', 'DC Comics', 'Dark Horse Comics', 'NBC - Heroes'];
      const correctPub = targetHero.biography?.publisher || 'Marvel Comics';
      const remainingPubs = allPubs.filter((p) => p !== correctPub).sort(() => 0.5 - Math.random()).slice(0, 3);
      choices = [correctPub, ...remainingPubs].map((p) => ({
        id: p,
        label: p,
        image: null,
        isCorrect: p === correctPub,
      }));
    } else {
      // mode: 'highestStat'
      const statsList = [
        { key: 'strength', label: 'FUERZA' },
        { key: 'speed', label: 'VELOCIDAD' },
        { key: 'intelligence', label: 'INTELIGENCIA' },
        { key: 'power', label: 'PODER' },
      ];
      const targetStat = statsList[Math.floor(Math.random() * statsList.length)];
      questionText = `¿Quién de estos 4 personajes tiene mayor nivel de ${targetStat.label}?`;

      // Encontrar el de mayor valor en esa stat
      let maxVal = -1;
      let winningHero = optionPool[0];
      optionPool.forEach((h) => {
        const val = h.powerstats?.[targetStat.key] || 0;
        if (val > maxVal) {
          maxVal = val;
          winningHero = h;
        }
      });

      choices = optionPool.map((h) => ({
        id: h.id,
        label: `${h.name} (${h.powerstats?.[targetStat.key] || 0}%)`,
        image: h.images?.sm || h.images?.md,
        isCorrect: h.id === winningHero.id,
      }));
    }

    choices.sort(() => 0.5 - Math.random());

    setCurrentQuestion({
      mode,
      questionText,
      targetHero,
      imageToShow,
      isSilhouette,
      choices,
    });
  };

  // Iniciar partida
  const startNewGame = () => {
    setScore(0);
    setStreak(0);
    setLives(3);
    setGameOver(false);
    generateQuestion();
  };

  useEffect(() => {
    if (isOpen) {
      startNewGame();
    }
  }, [isOpen]);

  // Temporizador
  useEffect(() => {
    if (!isOpen || isAnswered || gameOver || !currentQuestion) return;

    if (timeLeft <= 0) {
      handleAnswer(null);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isAnswered, gameOver, isOpen, currentQuestion]);

  const handleAnswer = (choice) => {
    if (isAnswered || gameOver) return;
    setIsAnswered(true);
    setSelectedOption(choice);

    if (choice && choice.isCorrect) {
      playVictory();
      const pointsGained = 100 + timeLeft * 10 + streak * 25;
      const nextScore = score + pointsGained;
      const nextStreak = streak + 1;
      setScore(nextScore);
      setStreak(nextStreak);

      if (nextScore > highScore) {
        setHighScore(nextScore);
        try {
          localStorage.setItem(HIGH_SCORE_KEY, nextScore.toString());
        } catch {}
      }
    } else {
      playHit();
      setStreak(0);
      const nextLives = lives - 1;
      setLives(nextLives);
      if (nextLives <= 0) {
        setGameOver(true);
      }
    }
  };

  const getRankMedal = (pts) => {
    if (pts >= 1500) return { title: 'Rey del Multiverso 👑', color: 'text-amber-400' };
    if (pts >= 800) return { title: 'Vengador Supremo ⚡', color: 'text-red-400' };
    if (pts >= 400) return { title: 'Héroe de Barrio 🕷️', color: 'text-blue-400' };
    return { title: 'Iniciado Arácnido 🕸️', color: 'text-neutral-400' };
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🎮</span>
              <h3 className="text-lg font-black text-white uppercase tracking-wider">
                Trivia del Multiverso
              </h3>
            </div>
            {/* Vidas y Puntuación */}
            <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 mt-1">
              <div className="flex items-center gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm transition-transform ${
                      i < lives ? 'text-red-500 scale-100' : 'text-neutral-700 grayscale scale-90'
                    }`}
                  >
                    ❤️
                  </span>
                ))}
              </div>
              <span>
                Puntos: <strong className="text-amber-400">{score}</strong>
              </span>
              {streak > 1 && (
                <span className="text-red-400 font-bold animate-pulse">
                  {streak}x Combo! 🔥
                </span>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white transition-colors"
            type="button"
          >
            ✕
          </button>
        </div>

        {!gameOver && currentQuestion ? (
          <>
            {/* Barra de Tiempo */}
            <div className="h-2 w-full bg-neutral-900 rounded-full overflow-hidden mb-5">
              <div
                className={`h-full transition-all duration-1000 ${
                  timeLeft > 4 ? 'bg-gradient-to-r from-red-600 to-blue-600' : 'bg-red-500 animate-pulse'
                }`}
                style={{ width: `${(timeLeft / 12) * 100}%` }}
              ></div>
            </div>

            {/* Contenedor Visual Central (SIEMPRE MUESTRA IMAGEN CON ALTA DEFINICIÓN) */}
            <div className="flex flex-col items-center text-center mb-5">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-3 rounded-2xl overflow-hidden bg-neutral-900 border-2 border-neutral-700 shadow-xl flex items-center justify-center">
                <img
                  src={currentQuestion.imageToShow}
                  alt="Héroe Trivia"
                  className={`w-full h-full object-cover object-top transition-all duration-500 ${
                    currentQuestion.isSilhouette && !isAnswered
                      ? 'brightness-0 contrast-200 invert'
                      : 'filter-none scale-105'
                  }`}
                />
                {currentQuestion.isSilhouette && !isAnswered && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-2xl">
                    ❓
                  </div>
                )}
              </div>

              <h4 className="text-sm sm:text-base font-bold text-white max-w-md">
                {currentQuestion.questionText}
              </h4>
            </div>

            {/* Opciones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
              {currentQuestion.choices.map((choice, idx) => {
                let btnClass =
                  'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-600 hover:text-white';

                if (isAnswered) {
                  if (choice.isCorrect) {
                    btnClass =
                      'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold shadow-lg shadow-emerald-900/40 scale-[1.02]';
                  } else if (selectedOption?.id === choice.id) {
                    btnClass = 'bg-red-950/80 border-red-500 text-red-300 font-bold';
                  } else {
                    btnClass = 'bg-neutral-900/40 border-neutral-900 text-neutral-600 opacity-40';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(choice)}
                    disabled={isAnswered}
                    className={`p-3 text-xs rounded-xl border font-mono transition-all text-left truncate flex items-center gap-2.5 ${btnClass}`}
                  >
                    {choice.image ? (
                      <img
                        src={choice.image}
                        alt=""
                        className="w-6 h-6 rounded-full object-cover border border-neutral-700 shrink-0"
                      />
                    ) : (
                      <span className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center text-[10px] text-neutral-400 shrink-0">
                        {idx + 1}
                      </span>
                    )}
                    <span className="truncate">{choice.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Botón Siguiente Pregunta */}
            {isAnswered && (
              <button
                onClick={generateQuestion}
                className="w-full py-3 bg-gradient-to-r from-red-600 to-blue-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 hover:scale-[1.02] transition-transform font-mono"
                type="button"
              >
                Siguiente Pregunta &rarr;
              </button>
            )}
          </>
        ) : (
          /* Pantalla de Fin de Juego (Game Over) */
          <div className="text-center py-6 sm:py-8 space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-red-950/80 border border-red-600 text-red-400 mx-auto flex items-center justify-center text-3xl">
              💀
            </div>
            <div>
              <h3 className="text-2xl font-black text-white uppercase">¡Fin de la Partida!</h3>
              <p className="text-xs text-neutral-400 font-mono mt-1">
                Te has quedado sin vidas en el Multiverso.
              </p>
            </div>

            <div className="bg-neutral-900/80 p-4 rounded-2xl border border-neutral-800 max-w-sm mx-auto space-y-2 text-xs font-mono">
              <div className="flex justify-between text-neutral-400">
                <span>Puntuación Final:</span>
                <span className="text-amber-400 font-bold text-sm">{score} pts</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Récord Histórico:</span>
                <span className="text-cyan-400 font-bold">{highScore} pts</span>
              </div>
              <div className="flex justify-between text-neutral-400 pt-2 border-t border-neutral-800">
                <span>Rango Asignado:</span>
                <span className={`font-bold ${getRankMedal(score).color}`}>
                  {getRankMedal(score).title}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={startNewGame}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-blue-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 hover:scale-105 transition-transform font-mono"
                type="button"
              >
                🔄 Jugar Otra Vez
              </button>
              <button
                onClick={onClose}
                className="px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold rounded-xl text-xs uppercase transition-colors font-mono"
                type="button"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TriviaModal;
