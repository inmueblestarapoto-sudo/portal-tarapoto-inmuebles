// Página individual, compartible e indexable, para una propiedad.
// Se sirve en https://tarapotoinmuebles.pe/p/{id} — Cloudflare Pages Functions
// convierte automáticamente el nombre de archivo [id].js en esa ruta.

const SUPABASE_URL = 'https://tqistvisnbcmiocmimos.supabase.co';
const SUPABASE_KEY = 'sb_publishable_NyCjJkq-17DqOv-5GVg42Q_Cvt2Bp19';
const SITE_URL = 'https://tarapotoinmuebles.pe';
const WHATSAPP_NUMBER = '51992226283';

const CARACT_COUNTERS = [
  { key: 'habitaciones', label: 'Habitaciones', icon: '🛏️' },
  { key: 'banos', label: 'Baños', icon: '🚿' },
  { key: 'cocina', label: 'Cocina', icon: '🍳' },
  { key: 'salas', label: 'Salas / Comedor', icon: '🛋️' },
  { key: 'espacios', label: 'Otros ambientes', icon: '🏠' },
  { key: 'pisos', label: 'Pisos', icon: '🏢' },
  { key: 'cocheras', label: 'Cocheras', icon: '🚗' },
  { key: 'piscina', label: 'Piscina', icon: '🏊' }
];

const CARACT_SINONIMOS = {
  habitaciones: ['habitaciones', 'habitacion', 'dormitorio', 'dormitorios', 'cuarto', 'cuartos'],
  banos: ['banos', 'bano'],
  cocina: ['cocina', 'cocinas'],
  salas: ['salas / comedor', 'sala / comedor', 'salas', 'sala', 'comedor', 'comedores'],
  espacios: ['otros ambientes', 'otro ambiente', 'ambientes', 'ambiente'],
  pisos: ['pisos', 'piso'],
  cocheras: ['cocheras', 'cochera', 'garage', 'garages', 'garaje', 'garajes', 'estacionamiento', 'estacionamientos'],
  piscina: ['piscina', 'piscinas']
};
function normalizarCaractTexto(s) {
  return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
}

function parseCaracteristicasTexto(texto) {
  const counts = {};
  CARACT_COUNTERS.forEach(c => { counts[c.key] = 0; });
  let otros = '';
  if (!texto) return { counts, otros };
  const marcador = '. Otras características: ';
  const idx = texto.indexOf(marcador);
  const estructurado = idx !== -1 ? texto.slice(0, idx) : texto;
  otros = idx !== -1 ? texto.slice(idx + marcador.length) : '';
  estructurado.split(',').map(s => s.trim()).filter(Boolean).forEach(seg => {
    const m = seg.match(/^(\d+)\s+(.+)$/);
    if (m) {
      const num = parseInt(m[1], 10);
      const etiquetaNorm = normalizarCaractTexto(m[2]);
      const claveMatch = Object.keys(CARACT_SINONIMOS).find(k => CARACT_SINONIMOS[k].some(s => normalizarCaractTexto(s) === etiquetaNorm));
      if (claveMatch) { counts[claveMatch] = num; return; }
    }
    otros = otros ? (otros + ', ' + seg) : seg;
  });
  return { counts, otros };
}

function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function money(n, moneda) {
  const simbolo = moneda === 'PEN' ? 'S/' : '$';
  return simbolo + Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function paginaNoDisponible() {
  return `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
<title>Propiedad no disponible - Tarapoto Inmuebles</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
</head><body style="font-family:sans-serif;text-align:center;padding:60px 20px;">
<h1>Esta propiedad ya no está disponible</h1>
<p><a href="${SITE_URL}/">Ver todas las propiedades en Tarapoto Inmuebles →</a></p>
</body></html>`;
}

export async function onRequestGet(context) {
  const id = context.params.id;
  if (!id) {
    return new Response(paginaNoDisponible(), { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }

  let propiedad = null;
  try {
    const res = await fetch(
      SUPABASE_URL + '/rest/v1/propiedades?id=eq.' + encodeURIComponent(id) + '&select=*',
      { headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY } }
    );
    const data = await res.json();
    propiedad = Array.isArray(data) ? data[0] : null;
  } catch (err) {
    propiedad = null;
  }

  if (!propiedad || propiedad.estado !== 'activo') {
    return new Response(paginaNoDisponible(), { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }

  const p = propiedad;
  const esAlquiler = (p.tipo || '').indexOf('alquiler') !== -1;
  const titulo = p.titulo || 'Propiedad en Tarapoto';
  const precioTxt = money(p.precio_real, p.moneda) + ' ' + (p.moneda === 'PEN' ? 'soles' : 'dólares');
  const metrosTxt = (p.metros || '—') + ' ' + (p.unidad_metros || 'm²');
  const parsed = parseCaracteristicasTexto(p.caracteristicas || '');
  const chips = CARACT_COUNTERS
    .filter(c => (parsed.counts[c.key] || 0) > 0)
    .map(c => `<div class="chip"><span class="icon">${c.icon}</span><span>${parsed.counts[c.key]} ${c.label}</span></div>`)
    .join('');
  const descripcionCorta = (p.descripcion || p.destacados || ('Propiedad ' + (esAlquiler ? 'en alquiler' : 'en venta') + ' en Tarapoto, ' + metrosTxt + '.')).slice(0, 200);
  const foto = p.foto_principal || '';
  const urlPropiedad = SITE_URL + '/p/' + p.id;
  const whatsappMsg = encodeURIComponent('Hola, estoy interesado en la propiedad "' + titulo + '" que vi en ' + urlPropiedad + '. Quería más información.');

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(titulo)} - Tarapoto Inmuebles</title>
<meta name="description" content="${escapeHtml(descripcionCorta)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Tarapoto Inmuebles">
<meta property="og:title" content="${escapeHtml(titulo)}">
<meta property="og:description" content="${escapeHtml(descripcionCorta)}">
<meta property="og:url" content="${urlPropiedad}">
${foto ? `<meta property="og:image" content="${escapeHtml(foto)}">` : ''}
<meta name="twitter:card" content="${foto ? 'summary_large_image' : 'summary'}">
<meta name="twitter:title" content="${escapeHtml(titulo)}">
<meta name="twitter:description" content="${escapeHtml(descripcionCorta)}">
${foto ? `<meta name="twitter:image" content="${escapeHtml(foto)}">` : ''}
<style>
  body{font-family:'Segoe UI',Arial,sans-serif;background:#DCD5C6;color:#16324A;margin:0;padding:0;}
  .wrap{max-width:600px;margin:0 auto;background:#fff;min-height:100vh;}
  .foto{width:100%;aspect-ratio:4/3;object-fit:cover;background:#eee;display:block;}
  .body{padding:20px;}
  .tag{display:inline-block;background:#16324A;color:#fff;font-size:12px;font-weight:700;padding:4px 10px;border-radius:20px;margin-bottom:10px;}
  h1{font-size:22px;margin:6px 0;}
  .precio{font-size:24px;font-weight:800;margin:8px 0 18px;}
  .metros{color:#666;font-size:14px;margin-bottom:10px;}
  .section-title{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin:22px 0 8px;color:#16324A;}
  .text{font-size:16px;line-height:1.55;}
  .chips{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;}
  .chip{display:flex;align-items:center;gap:8px;background:#DCD5C6;border-radius:9px;padding:9px 11px;font-size:14px;}
  .icon{font-size:18px;}
  .cta{display:flex;gap:8px;margin-top:26px;}
  .cta a{flex:1;text-align:center;padding:14px;border-radius:10px;font-weight:800;text-decoration:none;font-size:14.5px;}
  .cta .wsp{background:#25D366;color:#fff;}
  .cta .ver{background:#16324A;color:#fff;}
</style>
</head>
<body>
<div class="wrap">
  ${foto ? `<img class="foto" src="${escapeHtml(foto)}" alt="${escapeHtml(titulo)}">` : ''}
  <div class="body">
    <span class="tag">${esAlquiler ? 'Alquiler' : 'Venta'}</span>
    <h1>${escapeHtml(titulo)}</h1>
    <div class="metros">${escapeHtml(metrosTxt)}</div>
    <div class="precio">${precioTxt}</div>
    ${p.descripcion ? `<div class="section-title">Descripción</div><div class="text">${escapeHtml(p.descripcion)}</div>` : ''}
    ${chips ? `<div class="section-title">Características</div><div class="chips">${chips}</div>` : ''}
    ${p.destacados ? `<div class="section-title">Lo que más destaca</div><div class="text">${escapeHtml(p.destacados)}</div>` : ''}
    ${p.referencia ? `<div class="section-title">Ubicación referencial</div><div class="text">${escapeHtml(p.referencia)}</div>` : ''}
    <div class="cta">
      <a class="wsp" href="https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}">💬 Escribir por WhatsApp</a>
      <a class="ver" href="${SITE_URL}/?propiedad=${p.id}">Ver todos los detalles →</a>
    </div>
  </div>
</div>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300' }
  });
}
