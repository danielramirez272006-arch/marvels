// src/components/heroes/BattleSimulator.jsx
import React, { useEffect, useRef, useState } from 'react';
import { playHit, playVictory } from '../../utils/soundEffects';

export const BattleSimulator = ({ hero1, hero2 }) => {
  const getInitialHp = (hero) => {
    if (!hero) return 500;
    const dur = Number(hero.powerstats?.durability) || 50;
    const str = Number(hero.powerstats?.strength) || 50;
    return dur * 8 + str * 4 + 300;
  };

  const maxHp1 = getInitialHp(hero1);
  const maxHp2 = getInitialHp(hero2);

  const [hp1, setHp1] = useState(maxHp1);
  const [hp2, setHp2] = useState(maxHp2);
  const [battleLogs, setBattleLogs] = useState([]);
  const [turn, setTurn] = useState(1);
  const [isFighting, setIsFighting] = useState(false);
  const [winner, setWinner] = useState(null);

  const logsEndRef = useRef(null);

  // Reiniciar combate automáticamente al cambiar cualquiera de los luchadores
  useEffect(() => {
    setHp1(getInitialHp(hero1));
    setHp2(getInitialHp(hero2));
    setBattleLogs([]);
    setTurn(1);
    setIsFighting(false);
    setWinner(null);
  }, [hero1?.id, hero2?.id]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [battleLogs]);

  // Ejecutar un turno de combate
  const executeTurn = () => {
    if (winner || hp1 <= 0 || hp2 <= 0 || !hero1 || !hero2) return;

    // Determinar quién ataca en este turno
    const attacker = turn % 2 !== 0 ? hero1 : hero2;
    const defender = turn % 2 !== 0 ? hero2 : hero1;
    const isHero1Attacker = attacker.id === hero1.id;

    const atkSpeed = Number(attacker.powerstats?.speed) || 50;
    const defSpeed = Number(defender.powerstats?.speed) || 50;
    const atkStr = Number(attacker.powerstats?.strength) || 50;
    const atkPwr = Number(attacker.powerstats?.power) || 50;
    const atkCmb = Number(attacker.powerstats?.combat) || 50;
    const defDur = Number(defender.powerstats?.durability) || 50;

    // Probabilidad de esquivar
    const dodgeChance = Math.max(5, Math.min(35, (defSpeed - atkSpeed) / 2 + 10));
    const didDodge = Math.random() * 100 < dodgeChance;

    if (didDodge) {
      setBattleLogs((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          text: `💨 ¡${defender.name} usa sus reflejos y esquiva el ataque de ${attacker.name}!`,
          type: 'dodge',
        },
      ]);
      setTurn((prev) => prev + 1);
      return;
    }

    // Probabilidad de golpe crítico
    const critChance = Math.max(10, atkCmb / 3);
    const isCrit = Math.random() * 100 < critChance;

    // Cálculo de daño
    const baseDmg = atkStr * 0.8 + atkPwr * 0.6;
    const defenseReduction = defDur * 0.3;
    const variance = Math.random() * 20 - 10;
    const finalDamage = Math.max(20, Math.round((baseDmg - defenseReduction + variance) * (isCrit ? 1.6 : 1)));

    playHit();

    if (isHero1Attacker) {
      setHp2((currentHp2) => {
        const nextHp = Math.max(0, currentHp2 - finalDamage);
        if (nextHp <= 0) {
          setWinner(hero1);
          setIsFighting(false);
          playVictory();
        }
        return nextHp;
      });

      setBattleLogs((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          text: `💥 ${attacker.name} impacta a ${defender.name} con ${finalDamage} de daño ${
            isCrit ? '¡GOLPE CRÍTICO!' : ''
          }`,
          type: isCrit ? 'crit' : 'hit',
        },
      ]);
    } else {
      setHp1((currentHp1) => {
        const nextHp = Math.max(0, currentHp1 - finalDamage);
        if (nextHp <= 0) {
          setWinner(hero2);
          setIsFighting(false);
          playVictory();
        }
        return nextHp;
      });

      setBattleLogs((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          text: `⚡ ${attacker.name} arremete contra ${defender.name} con ${finalDamage} de daño ${
            isCrit ? '¡GOLPE CRÍTICO!' : ''
          }`,
          type: isCrit ? 'crit' : 'hit',
        },
      ]);
    }

    setTurn((prev) => prev + 1);
  };

  // Simulación automática
  useEffect(() => {
    let interval = null;
    if (isFighting && !winner && hp1 > 0 && hp2 > 0) {
      interval = setInterval(() => {
        executeTurn();
      }, 750);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isFighting, turn, winner, hp1, hp2, hero1, hero2]);

  const restartBattle = () => {
    setHp1(maxHp1);
    setHp2(maxHp2);
    setBattleLogs([]);
    setTurn(1);
    setIsFighting(false);
    setWinner(null);
  };

  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 sm:p-6 space-y-6">
      {/* Marcador de Salud (HP) */}
      <div className="grid grid-cols-2 gap-4">
        {/* Luchador 1 */}
        <div>
          <div className="flex justify-between items-center text-xs font-mono mb-1">
            <span className="text-red-400 font-bold truncate max-w-[120px]">{hero1?.name}</span>
            <span className="text-neutral-300">
              {hp1} / {maxHp1} HP
            </span>
          </div>
          <div className="h-3 w-full bg-neutral-950 rounded-full overflow-hidden border border-neutral-800">
            <div
              className="h-full bg-gradient-to-r from-red-600 to-rose-500 transition-all duration-300"
              style={{ width: `${Math.max(0, (hp1 / maxHp1) * 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Luchador 2 */}
        <div>
          <div className="flex justify-between items-center text-xs font-mono mb-1">
            <span className="text-blue-400 font-bold truncate max-w-[120px]">{hero2?.name}</span>
            <span className="text-neutral-300">
              {hp2} / {maxHp2} HP
            </span>
          </div>
          <div className="h-3 w-full bg-neutral-950 rounded-full overflow-hidden border border-neutral-800">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300"
              style={{ width: `${Math.max(0, (hp2 / maxHp2) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Registro de Batalla (Logs) */}
      <div className="h-44 overflow-y-auto bg-neutral-950 p-3 rounded-xl border border-neutral-800/80 space-y-1.5 font-mono text-xs">
        {battleLogs.length === 0 && (
          <p className="text-neutral-600 text-center py-14">
            Pulsa "▶️ Iniciar Pelea Automática" o "Siguiente Turno" para comenzar el combate.
          </p>
        )}
        {battleLogs.map((log) => (
          <div
            key={log.id}
            className={`p-1.5 rounded ${
              log.type === 'crit'
                ? 'text-amber-300 bg-amber-950/30 font-bold'
                : log.type === 'dodge'
                ? 'text-cyan-300 bg-cyan-950/30 italic'
                : 'text-neutral-300'
            }`}
          >
            {log.text}
          </div>
        ))}
        <div ref={logsEndRef} />
      </div>

      {/* Banner de Victoria */}
      {winner && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 text-white text-center font-black text-base sm:text-lg animate-pulse shadow-lg shadow-red-600/30">
          🏆 ¡{winner.name.toUpperCase()} HA VENCIDO EN EL COMBATE!
        </div>
      )}

      {/* Controles del Simulador */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {!winner ? (
          <>
            <button
              onClick={() => setIsFighting(!isFighting)}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all ${
                isFighting
                  ? 'bg-amber-600 hover:bg-amber-500 text-white'
                  : 'bg-gradient-to-r from-red-600 to-blue-600 hover:scale-105 text-white shadow-md shadow-red-600/30'
              }`}
              type="button"
            >
              {isFighting ? '⏸️ Pausar Simulación' : '▶️ Pelea Automática'}
            </button>

            <button
              onClick={executeTurn}
              disabled={isFighting}
              className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold font-mono uppercase rounded-xl border border-neutral-700 disabled:opacity-40 transition-colors"
              type="button"
            >
              Siguiente Turno ⏭️
            </button>
          </>
        ) : (
          <button
            onClick={restartBattle}
            className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold font-mono uppercase rounded-xl border border-neutral-700 transition-colors"
            type="button"
          >
            🔄 Revancha / Reiniciar Pelea
          </button>
        )}
      </div>
    </div>
  );
};

export default BattleSimulator;
