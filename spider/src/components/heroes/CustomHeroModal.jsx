// src/components/heroes/CustomHeroModal.jsx
import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { playVictory } from '../../utils/soundEffects';
import RadarChart from '../ui/RadarChart';

const PRESET_AVATARS = [
  'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/620-spider-man.jpg',
  'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/622-spider-man.jpg',
  'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/623-spider-man.jpg',
  'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/687-venom.jpg',
  'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/346-iron-man.jpg',
  'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/225-doctor-strange.jpg',
];

export const CustomHeroModal = ({ isOpen, onClose, onSaveCustomHero }) => {
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [fullName, setFullName] = useState('');
  const [publisher, setPublisher] = useState('Marvel Comics');
  const [alignment, setAlignment] = useState('good');
  const [gender, setGender] = useState('Male');
  const [imageUrl, setImageUrl] = useState(PRESET_AVATARS[0]);

  const [powerstats, setPowerstats] = useState({
    intelligence: 75,
    strength: 80,
    speed: 70,
    durability: 65,
    power: 85,
    combat: 75,
  });

  if (!isOpen) return null;

  const handleStatChange = (statKey, value) => {
    setPowerstats((prev) => ({
      ...prev,
      [statKey]: Number(value),
    }));
  };

  const previewHero = {
    id: `custom_${Date.now()}`,
    name: name.trim() || 'Mi Variante Arácnida',
    biography: {
      fullName: fullName.trim() || 'Identidad Oculta',
      publisher: publisher.trim() || 'Multiverse',
      alignment,
      placeOfBirth: 'Tierra Alternativa',
      firstAppearance: 'Spider-Verse Hub (2026)',
    },
    appearance: {
      gender,
      race: 'Variante Mutante',
    },
    images: {
      sm: imageUrl,
      md: imageUrl,
      lg: imageUrl,
    },
    powerstats,
  };

  const totalPower = Object.values(powerstats).reduce((a, b) => a + b, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Por favor escribe un nombre para tu héroe.', 'warning');
      return;
    }

    onSaveCustomHero(previewHero);
    playVictory();
    showToast(`¡${previewHero.name} ha nacido en el Multiverso! 🧬`, 'success');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧬</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
                Laboratorio Genético del Multiverso
              </h2>
              <p className="text-xs text-neutral-400 font-mono">
                Crea, personaliza y despliega tu propia variante de superhéroe
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white"
            type="button"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Columna Izquierda: Formulario */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-mono text-neutral-400 block mb-1">
                  Nombre del Héroe *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Spider-Knight"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs font-sans focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-neutral-400 block mb-1">
                  Nombre Real / Alter Ego
                </label>
                <input
                  type="text"
                  placeholder="Ej: Peter de York"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs font-sans focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-mono text-neutral-400 block mb-1">Editorial</label>
                <select
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  className="w-full px-2.5 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-red-500 cursor-pointer"
                >
                  <option value="Marvel Comics">Marvel</option>
                  <option value="DC Comics">DC Comics</option>
                  <option value="Spider-Verse">Spider-Verse</option>
                  <option value="Independiente">Independiente</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-neutral-400 block mb-1">Bando</label>
                <select
                  value={alignment}
                  onChange={(e) => setAlignment(e.target.value)}
                  className="w-full px-2.5 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-red-500 cursor-pointer"
                >
                  <option value="good">Héroe</option>
                  <option value="bad">Villano</option>
                  <option value="neutral">Neutral</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-neutral-400 block mb-1">Género</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-2.5 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-red-500 cursor-pointer"
                >
                  <option value="Male">Masculino</option>
                  <option value="Female">Femenino</option>
                  <option value="Other">Otro / Simbionte</option>
                </select>
              </div>
            </div>

            {/* Selector de Avatar */}
            <div>
              <label className="text-xs font-mono text-neutral-400 block mb-1.5">
                Avatar del Personaje
              </label>
              <div className="flex items-center gap-2 mb-2">
                {PRESET_AVATARS.map((av, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImageUrl(av)}
                    className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition-transform ${
                      imageUrl === av ? 'border-red-500 scale-110 shadow-lg shadow-red-600/40' : 'border-neutral-800 opacity-60'
                    }`}
                  >
                    <img src={av} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <input
                type="url"
                placeholder="O pega una URL de imagen personalizada..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-300 text-xs font-mono"
              />
            </div>

            {/* Sliders de Estadísticas */}
            <div className="space-y-2.5 bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800">
              <span className="text-[11px] font-mono text-neutral-400 uppercase font-bold tracking-wider block">
                Distribución de Habilidades (0 - 100)
              </span>
              {[
                { key: 'intelligence', label: 'Inteligencia', color: 'accent-blue-500' },
                { key: 'strength', label: 'Fuerza', color: 'accent-red-500' },
                { key: 'speed', label: 'Velocidad', color: 'accent-amber-500' },
                { key: 'durability', label: 'Durabilidad', color: 'accent-emerald-500' },
                { key: 'power', label: 'Poder', color: 'accent-purple-500' },
                { key: 'combat', label: 'Combate', color: 'accent-rose-500' },
              ].map((st) => (
                <div key={st.key} className="flex items-center gap-3 text-xs font-mono">
                  <span className="w-24 text-neutral-300">{st.label}:</span>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={powerstats[st.key]}
                    onChange={(e) => handleStatChange(st.key, e.target.value)}
                    className={`flex-1 ${st.color} cursor-pointer`}
                  />
                  <span className="w-10 text-right font-bold text-white">
                    {powerstats[st.key]}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Columna Derecha: Vista Previa & Radar */}
          <div className="lg:col-span-5 flex flex-col justify-between items-center bg-neutral-900/40 p-4 rounded-2xl border border-neutral-800">
            <div className="text-center w-full">
              <span className="text-xs font-mono text-neutral-400 uppercase font-bold tracking-wider block mb-2">
                Vista Previa del Genoma Arácnido
              </span>

              <div className="w-24 h-24 rounded-2xl overflow-hidden mx-auto mb-2 border-2 border-red-500 shadow-lg shadow-red-600/30">
                <img src={imageUrl} alt="" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-base font-black text-white">{previewHero.name}</h4>
              <p className="text-xs text-neutral-400 italic font-mono mb-2">{previewHero.biography.fullName}</p>
              <span className="text-xs font-mono text-amber-400 font-bold">
                Poder Total: {totalPower} pts
              </span>

              {/* Telaraña Radar en Vivo */}
              <div className="my-2">
                <RadarChart hero1={previewHero} size={190} />
              </div>
            </div>

            {/* Botón Guardar */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider font-mono shadow-lg shadow-red-600/30 hover:scale-105 transition-all mt-4"
            >
              🚀 Crear y Guardar en el Multiverso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomHeroModal;
