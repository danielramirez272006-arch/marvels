// src/utils/cardGenerator.js
/**
 * Generador nativo de Tarjetas Coleccionables en PNG usando HTML5 Canvas.
 */
export const downloadHeroTradingCard = async (hero) => {
  if (!hero) return;

  const canvas = document.createElement('canvas');
  const width = 600;
  const height = 900;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  // 1. Fondo Degradado Oscuro
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#0a0a0a');
  bgGrad.addColorStop(0.5, '#171717');
  bgGrad.addColorStop(1, '#050505');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Borde Neón Cósmico
  ctx.lineWidth = 12;
  const borderGrad = ctx.createLinearGradient(0, 0, width, height);
  borderGrad.addColorStop(0, '#dc2626');
  borderGrad.addColorStop(0.5, '#9333ea');
  borderGrad.addColorStop(1, '#2563eb');
  ctx.strokeStyle = borderGrad;
  ctx.strokeRect(10, 10, width - 20, height - 20);

  // 3. Encabezado de la Tarjeta
  ctx.fillStyle = '#dc2626';
  ctx.font = 'bold 16px monospace';
  ctx.fillText('SPIDER-VERSE COLLECTIBLE CARD', 30, 45);

  ctx.fillStyle = '#a3a3a3';
  ctx.font = '14px monospace';
  const pubText = (hero.biography?.publisher || 'MULTIVERSE').toUpperCase();
  ctx.fillText(pubText, width - ctx.measureText(pubText).width - 30, 45);

  // 4. Imagen del Héroe
  const imageUrl = hero.images?.lg || hero.images?.md || hero.images?.sm;
  if (imageUrl) {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      // Marco de la imagen
      ctx.save();
      ctx.strokeStyle = '#404040';
      ctx.lineWidth = 4;
      ctx.strokeRect(30, 65, width - 60, 440);
      ctx.drawImage(img, 30, 65, width - 60, 440);
      ctx.restore();
    } catch (e) {
      // Si falla la carga de imagen por CORS, dibujar placeholder estilizado
      ctx.fillStyle = '#262626';
      ctx.fillRect(30, 65, width - 60, 440);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText(hero.name, 50, 280);
    }
  }

  // 5. Degradado sobre la parte inferior de la imagen
  const overlayGrad = ctx.createLinearGradient(0, 420, 0, 505);
  overlayGrad.addColorStop(0, 'rgba(10,10,10,0)');
  overlayGrad.addColorStop(1, 'rgba(10,10,10,0.95)');
  ctx.fillStyle = overlayGrad;
  ctx.fillRect(30, 420, width - 60, 85);

  // 6. Nombre del Héroe y Nombre Real
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 36px sans-serif';
  ctx.fillText(hero.name.toUpperCase(), 40, 560);

  ctx.fillStyle = '#a3a3a3';
  ctx.font = 'italic 18px sans-serif';
  ctx.fillText(hero.biography?.fullName || 'Identidad Oculta', 40, 590);

  // 7. Estadísticas de Poder en Barras
  const stats = [
    { label: 'INTELIGENCIA', val: hero.powerstats?.intelligence || 0, color: '#38bdf8' },
    { label: 'FUERZA', val: hero.powerstats?.strength || 0, color: '#ef4444' },
    { label: 'VELOCIDAD', val: hero.powerstats?.speed || 0, color: '#eab308' },
    { label: 'DURABILIDAD', val: hero.powerstats?.durability || 0, color: '#10b981' },
    { label: 'PODER', val: hero.powerstats?.power || 0, color: '#a855f7' },
    { label: 'COMBATE', val: hero.powerstats?.combat || 0, color: '#f43f5e' },
  ];

  const totalPower = stats.reduce((acc, s) => acc + s.val, 0);

  let startY = 635;
  stats.forEach((st, idx) => {
    const col = idx % 2 === 0 ? 40 : width / 2 + 10;
    const currentY = startY + Math.floor(idx / 2) * 65;

    // Etiqueta
    ctx.fillStyle = '#d4d4d4';
    ctx.font = 'bold 12px monospace';
    ctx.fillText(`${st.label}: ${st.val}%`, col, currentY);

    // Barra de fondo
    ctx.fillStyle = '#262626';
    ctx.fillRect(col, currentY + 8, width / 2 - 50, 10);

    // Barra de color
    ctx.fillStyle = st.color;
    ctx.fillRect(col, currentY + 8, ((width / 2 - 50) * Math.max(5, st.val)) / 100, 10);
  });

  // 8. Pie de Tarjeta y Poder Total
  ctx.fillStyle = '#171717';
  ctx.fillRect(30, 825, width - 60, 45);

  ctx.fillStyle = '#eab308';
  ctx.font = 'bold 16px monospace';
  ctx.fillText(`PODER TOTAL: ${totalPower} PTS`, 50, 853);

  ctx.fillStyle = '#737373';
  ctx.font = '12px monospace';
  const seal = 'OFFICIAL MULTIVERSE ARCHIVE';
  ctx.fillText(seal, width - ctx.measureText(seal).width - 50, 853);

  // 9. Descargar Imagen
  const link = document.createElement('a');
  link.download = `spider_card_${hero.name.toLowerCase().replace(/\s+/g, '_')}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
};
