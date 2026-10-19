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

// Nombre legible del tipo de propiedad (para título, descripción y datos estructurados)
const TIPO_LABELS = {
  casa_venta: 'Casa en venta',
  casa_alquiler: 'Casa en alquiler',
  terreno_venta: 'Terreno en venta',
  terreno_alquiler: 'Terreno en alquiler',
  local_comercial_venta: 'Local comercial en venta',
  local_comercial_alquiler: 'Local comercial en alquiler',
  oficina_venta: 'Oficina en venta',
  oficina_alquiler: 'Oficina en alquiler',
  hotel_venta: 'Hotel en venta',
  hotel_alquiler: 'Hotel en alquiler'
};
function tipoLabel(tipo) {
  if (TIPO_LABELS[tipo]) return TIPO_LABELS[tipo];
  const t = String(tipo || '').replace(/_/g, ' ').trim();
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : 'Propiedad';
}

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

// Para incrustar JSON dentro de <script>: evita cerrar la etiqueta por accidente
function jsonSeguro(obj) {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}

// Para insertar texto dentro de comillas simples de un <script>
function escapeJs(s) {
  return String(s == null ? '' : s).replace(/[\\'"<>\n\r\u2028\u2029]/g, ' ');
}

function recortar(s, max) {
  s = String(s || '').replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;
  return s.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
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
<link rel="icon" href="/favicon.ico" sizes="any">
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
  const tipoTxt = tipoLabel(p.tipo);
  const titulo = p.titulo || (tipoTxt + ' en Tarapoto');
  const precioTxt = money(p.precio_real, p.moneda) + ' ' + (p.moneda === 'PEN' ? 'soles' : 'dólares');
  const metrosTxt = (p.metros || '—') + ' ' + (p.unidad_metros || 'm²');
  const parsed = parseCaracteristicasTexto(p.caracteristicas || '');
  const chips = CARACT_COUNTERS
    .filter(c => (parsed.counts[c.key] || 0) > 0)
    .map(c => `<div class="chip"><span class="icon">${c.icon}</span><span>${parsed.counts[c.key]} ${c.label}</span></div>`)
    .join('');

  // --- SEO: título y descripción pensados para lo que la gente busca en Google ---
  // Ej: "Local comercial en alquiler en Tarapoto – Local comercial plaza"
  const seoTitle = recortar(tipoTxt + ' en Tarapoto – ' + titulo, 65);
  const base = p.descripcion || p.destacados || '';
  const seoDesc = recortar(
    tipoTxt + ' en Tarapoto, ' + metrosTxt + '. ' + precioTxt + '. ' +
    (p.referencia ? p.referencia + '. ' : '') + base +
    ' Escríbenos por WhatsApp.',
    158
  );
  const descripcionCorta = seoDesc;

  const foto = p.foto_principal || '';
  const secundarias = (Array.isArray(p.fotos_secundarias) ? p.fotos_secundarias : []).filter(Boolean).slice(0, 4);
  const todasFotos = (foto ? [foto] : []).concat(secundarias);
  const urlPropiedad = SITE_URL + '/p/' + p.id;
  const whatsappMsg = encodeURIComponent('Hola, estoy interesado en la propiedad "' + titulo + '" que vi en ' + urlPropiedad + '. Quería más información.');

  // --- Datos estructurados (schema.org) ---
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'RealEstateListing',
        '@id': urlPropiedad + '#listing',
        url: urlPropiedad,
        name: titulo,
        description: recortar(base || seoDesc, 300),
        image: todasFotos,
        datePosted: p.created_at || undefined,
        inLanguage: 'es-PE',
        about: {
          '@type': 'Accommodation',
          name: tipoTxt,
          floorSize: p.metros ? { '@type': 'QuantitativeValue', value: Number(p.metros) || undefined, unitCode: 'MTK' } : undefined,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Tarapoto',
            addressRegion: 'San Martín',
            addressCountry: 'PE',
            streetAddress: p.referencia || undefined
          }
        },
        offers: {
          '@type': 'Offer',
          price: Number(p.precio_real) || undefined,
          priceCurrency: p.moneda === 'PEN' ? 'PEN' : 'USD',
          availability: 'https://schema.org/InStock',
          businessFunction: esAlquiler ? 'http://purl.org/goodrelations/v1#LeaseOut' : 'http://purl.org/goodrelations/v1#Sell',
          seller: { '@type': 'RealEstateAgent', name: 'Tarapoto Inmuebles', url: SITE_URL + '/', telephone: '+' + WHATSAPP_NUMBER }
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Tarapoto Inmuebles', item: SITE_URL + '/' },
          { '@type': 'ListItem', position: 2, name: titulo, item: urlPropiedad }
        ]
      }
    ]
  };

  const galeria = secundarias.length
    ? `<div class="galeria">${secundarias.map((u, i) => `<img src="${escapeHtml(u)}" alt="${escapeHtml(titulo + ' - foto ' + (i + 2))}" loading="lazy">`).join('')}</div>`
    : '';

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(seoTitle)}</title>
<meta name="description" content="${escapeHtml(descripcionCorta)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${urlPropiedad}">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png">
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-RP867VDQZP"></script>
<script>
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','G-RP867VDQZP');
window.tpiTrack=function(n,p){try{gtag('event',n,p||{});}catch(e){} try{ if(window.clarity&&(n==='whatsapp_click'||n==='generate_lead')) clarity('event',n); }catch(e){}};
document.addEventListener('click',function(e){try{
  var a=e.target.closest&&e.target.closest('a[href*="wa.me"]'); if(!a) return;
  var h=a.getAttribute('href')||''; var m=''; try{m=decodeURIComponent(h);}catch(x){m=h;}
  var ctx=/Coperholta/i.test(m)?'coperholta':(/Hola, estoy interesado|propiedad/i.test(m)?'propiedad':'general');
  tpiTrack('whatsapp_click',{contexto:ctx,pagina:location.pathname});
}catch(x){}},true);
var _wo=window.open;window.open=function(u){try{if(typeof u==='string'&&u.indexOf('wa.me')>-1)tpiTrack('share_whatsapp',{});}catch(x){}return _wo.apply(window,arguments);};
</script>
<!-- Microsoft Clarity -->
<script>
(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","yzzvbnquj3");
</script>
<script>tpiTrack("view_item",{item_name:'${escapeJs(titulo)}',item_category:'${escapeJs(p.tipo || "")}'});</script>
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:locale" content="es_PE">
<meta property="og:site_name" content="Tarapoto Inmuebles">
<meta property="og:title" content="${escapeHtml(titulo)} – ${escapeHtml(tipoTxt)}">
<meta property="og:description" content="${escapeHtml(descripcionCorta)}">
<meta property="og:url" content="${urlPropiedad}">
${foto ? `<meta property="og:image" content="${escapeHtml(foto)}">` : ''}
<meta name="twitter:card" content="${foto ? 'summary_large_image' : 'summary'}">
<meta name="twitter:title" content="${escapeHtml(titulo)} – ${escapeHtml(tipoTxt)}">
<meta name="twitter:description" content="${escapeHtml(descripcionCorta)}">
${foto ? `<meta name="twitter:image" content="${escapeHtml(foto)}">` : ''}
<script type="application/ld+json">${jsonSeguro(jsonLd)}</script>
<style>
  body{font-family:'Segoe UI',Arial,sans-serif;background:#DCD5C6;color:#16324A;margin:0;padding:0;}
  .wrap{max-width:600px;margin:0 auto;background:#fff;min-height:100vh;}
  .top{display:block;padding:12px 20px;background:#16324A;color:#fff;text-decoration:none;font-weight:700;font-size:15px;}
  .foto{width:100%;aspect-ratio:4/3;object-fit:cover;background:#eee;display:block;}
  .galeria{display:grid;grid-template-columns:repeat(2,1fr);gap:4px;margin-top:4px;}
  .galeria img{width:100%;aspect-ratio:4/3;object-fit:cover;background:#eee;display:block;}
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
  .mas{display:block;text-align:center;margin:22px 0 6px;color:#16324A;font-weight:700;font-size:14px;}
</style>
</head>
<body>
<div class="wrap">
  <a class="top" href="${SITE_URL}/">← Tarapoto Inmuebles · Todas las propiedades</a>
  ${foto ? `<img class="foto" src="${escapeHtml(foto)}" alt="${escapeHtml(titulo + ' - ' + tipoTxt + ' en Tarapoto')}">` : ''}
  ${galeria}
  <div class="body">
    <span class="tag">${esAlquiler ? 'Alquiler' : 'Venta'}</span>
    <h1>${escapeHtml(titulo)}</h1>
    <div class="metros">${escapeHtml(tipoTxt)} en Tarapoto · ${escapeHtml(metrosTxt)}</div>
    <div class="precio">${precioTxt}</div>
    ${p.descripcion ? `<div class="section-title">Descripción</div><div class="text">${escapeHtml(p.descripcion)}</div>` : ''}
    ${chips ? `<div class="section-title">Características</div><div class="chips">${chips}</div>` : ''}
    ${p.destacados ? `<div class="section-title">Lo que más destaca</div><div class="text">${escapeHtml(p.destacados)}</div>` : ''}
    ${p.referencia ? `<div class="section-title">Ubicación referencial</div><div class="text">${escapeHtml(p.referencia)}</div>` : ''}
    <div class="cta">
      <a class="wsp" href="https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}">💬 Escribir por WhatsApp</a>
      <a class="ver" href="${SITE_URL}/?propiedad=${p.id}">Ver todos los detalles →</a>
    </div>
    <a class="mas" href="${SITE_URL}/">Ver más propiedades en Tarapoto →</a>
  </div>
</div>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300' }
  });
}
