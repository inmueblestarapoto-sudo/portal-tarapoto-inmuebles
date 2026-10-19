// Utilidades compartidas por las páginas de categoría (terrenos, casas, alquiler, lotes).
// No es una ruta: solo exporta funciones que importan los demás archivos de /functions.

export const SUPABASE_URL = 'https://tqistvisnbcmiocmimos.supabase.co';
export const SUPABASE_KEY = 'sb_publishable_NyCjJkq-17DqOv-5GVg42Q_Cvt2Bp19';
export const SITE_URL = 'https://tarapotoinmuebles.pe';
export const WHATSAPP_NUMBER = '51992226283';
const GA_ID = 'G-RP867VDQZP';
const CLARITY_ID = 'yzzvbnquj3';

export const TIPO_LABELS = {
  casa_venta: 'Casa en venta', casa_alquiler: 'Casa en alquiler',
  terreno_venta: 'Terreno en venta', terreno_alquiler: 'Terreno en alquiler',
  local_comercial_venta: 'Local comercial en venta', local_comercial_alquiler: 'Local comercial en alquiler',
  oficina_venta: 'Oficina en venta', oficina_alquiler: 'Oficina en alquiler',
  hotel_venta: 'Hotel en venta', hotel_alquiler: 'Hotel en alquiler'
};

export const CATEGORIAS = [
  { ruta: '/terrenos-en-tarapoto', nombre: 'Terrenos en Tarapoto' },
  { ruta: '/casas-en-venta-tarapoto', nombre: 'Casas en venta' },
  { ruta: '/alquiler-en-tarapoto', nombre: 'Alquileres' },
  { ruta: '/alquiler-de-casas-en-tarapoto', nombre: 'Alquiler de casas' },
  { ruta: '/alquiler-de-oficinas-en-tarapoto', nombre: 'Alquiler de oficinas' },
  { ruta: '/alquiler-de-edificios-en-tarapoto', nombre: 'Alquiler de edificios' },
  { ruta: '/hoteles-en-tarapoto', nombre: 'Hoteles' },
  { ruta: '/casas-en-tarapoto', nombre: 'Casas en Tarapoto' },
  { ruta: '/alquiler-de-locales-comerciales-en-tarapoto', nombre: 'Locales comerciales en alquiler' },
  { ruta: '/venta-de-locales-comerciales-en-tarapoto', nombre: 'Locales comerciales en venta' },
  { ruta: '/venta-de-oficinas-en-tarapoto', nombre: 'Oficinas en venta' },
  { ruta: '/venta-de-hoteles-en-tarapoto', nombre: 'Hoteles en venta' },
  { ruta: '/alquiler-de-hoteles-en-tarapoto', nombre: 'Hoteles en alquiler' },
  { ruta: '/alquiler-de-terrenos-en-tarapoto', nombre: 'Terrenos en alquiler' },
  { ruta: '/lotes-en-tarapoto', nombre: 'Lotes y proyectos' }
];

export function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function jsonSeguro(o) { return JSON.stringify(o).replace(/</g, '\\u003c'); }
export function recortar(s, max) {
  s = String(s || '').replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;
  return s.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
}
export function money(n, moneda) {
  const simbolo = moneda === 'PEN' ? 'S/' : '$';
  return simbolo + Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export async function sbGet(path) {
  try {
    const res = await fetch(SUPABASE_URL + '/rest/v1/' + path, {
      headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (e) { return []; }
}

export function cargarPropiedades(tipos) {
  const lista = tipos.map(encodeURIComponent).join(',');
  return sbGet(
    'propiedades?estado=eq.activo&tipo=in.(' + lista + ')' +
    '&select=id,titulo,tipo,metros,unidad_metros,precio_real,moneda,foto_principal,referencia,created_at' +
    '&order=created_at.desc&limit=60'
  );
}

export function cargarLotes() {
  return sbGet('lotes?proyecto=eq.coperholta&select=n,estado,m2&order=n.asc');
}

// Todos los proyectos de lotes (Coperholta y los que se agreguen después)
export function cargarTodosLosLotes() {
  return sbGet('lotes?select=proyecto,n,estado,m2&order=proyecto.asc,n.asc&limit=2000');
}

const TRACKING = '<script async src="https://www.googletagmanager.com/gtag/js?id=' + GA_ID + '"></script>' +
'<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","' + GA_ID + '");' +
'window.tpiTrack=function(n,p){try{gtag("event",n,p||{});}catch(e){} try{if(window.clarity&&n==="whatsapp_click")clarity("event",n);}catch(e){}};' +
'document.addEventListener("click",function(e){try{var a=e.target.closest&&e.target.closest("a[href*=\\"wa.me\\"]");if(!a)return;tpiTrack("whatsapp_click",{contexto:"categoria",pagina:location.pathname});}catch(x){}},true);</script>' +
'<script>(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","' + CLARITY_ID + '");</script>';

const CSS = `
body{font-family:'Segoe UI',Arial,sans-serif;background:#DCD5C6;color:#16324A;margin:0;}
.wrap{max-width:760px;margin:0 auto;background:#fff;min-height:100vh;}
.top{display:block;padding:12px 20px;background:#16324A;color:#fff;text-decoration:none;font-weight:700;font-size:15px;}
.body{padding:22px 20px 30px;}
h1{font-size:26px;line-height:1.2;margin:0 0 10px;}
h2{font-size:19px;margin:30px 0 10px;}
p{font-size:16px;line-height:1.6;margin:0 0 12px;}
.nav{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0 4px;}
.nav a{background:#DCD5C6;color:#16324A;text-decoration:none;font-weight:700;font-size:13.5px;padding:8px 12px;border-radius:20px;}
.nav a.on{background:#16324A;color:#fff;}
.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:14px;}
@media(max-width:520px){.grid{grid-template-columns:1fr;}}
.card{display:block;text-decoration:none;color:inherit;border:1px solid #E2DCCC;border-radius:12px;overflow:hidden;background:#fff;}
.card img{width:100%;aspect-ratio:4/3;object-fit:cover;background:#eee;display:block;}
.card .c{padding:12px;}
.card .t{font-weight:800;font-size:15.5px;margin:0 0 4px;}
.card .s{font-size:13px;color:#666;margin:0 0 6px;}
.card .p{font-weight:800;font-size:17px;margin:0;}
.vacio{background:#F5F1E8;border-radius:12px;padding:18px;margin-top:14px;}
.cta{display:block;text-align:center;background:#25D366;color:#fff;text-decoration:none;font-weight:800;padding:14px;border-radius:10px;margin-top:18px;}
.cta.alt{background:#16324A;}
.lotes{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:8px;margin-top:12px;}
.lote{border-radius:10px;padding:10px;text-align:center;text-decoration:none;color:#16324A;background:#E3F3E3;font-size:13px;}
.lote b{display:block;font-size:17px;}
.lote.separado{background:#FBEFC8;} .lote.vendido{background:#EEE;color:#999;}
.faq h3{font-size:16px;margin:16px 0 4px;} .faq p{margin:0 0 8px;}
.pie{font-size:13px;color:#666;margin-top:28px;}
`;

export function renderPagina(cfg) {
  const url = SITE_URL + cfg.ruta;
  const items = cfg.items || [];
  const nav = CATEGORIAS.map(c =>
    '<a href="' + c.ruta + '"' + (c.ruta === cfg.ruta ? ' class="on"' : '') + '>' + esc(c.nombre) + '</a>').join('');
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage', '@id': url, url: url, name: cfg.h1, description: cfg.descripcion,
        inLanguage: 'es-PE', isPartOf: { '@type': 'WebSite', name: 'Tarapoto Inmuebles', url: SITE_URL + '/' },
        about: { '@type': 'Place', name: 'Tarapoto, San Martín, Perú' }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Tarapoto Inmuebles', item: SITE_URL + '/' },
          { '@type': 'ListItem', position: 2, name: cfg.h1, item: url }
        ]
      }
    ]
  };
  if (cfg.listaUrls && cfg.listaUrls.length) {
    ld['@graph'].push({
      '@type': 'ItemList',
      itemListElement: cfg.listaUrls.map((u, i) => ({ '@type': 'ListItem', position: i + 1, url: u }))
    });
  }
  if (cfg.faq && cfg.faq.length) {
    ld['@graph'].push({
      '@type': 'FAQPage',
      mainEntity: cfg.faq.map(f => ({ '@type': 'Question', name: f[0], acceptedAnswer: { '@type': 'Answer', text: f[1] } }))
    });
  }
  const faqHtml = (cfg.faq && cfg.faq.length)
    ? '<div class="faq"><h2>Preguntas frecuentes</h2>' + cfg.faq.map(f => '<h3>' + esc(f[0]) + '</h3><p>' + esc(f[1]) + '</p>').join('') + '</div>'
    : '';
  const wsp = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(cfg.whatsappMsg || 'Hola, vi la página de Tarapoto Inmuebles y quisiera más información.');

  const html = '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<title>' + esc(cfg.titulo) + '</title>' +
    '<meta name="description" content="' + esc(cfg.descripcion) + '">' +
    '<meta name="robots" content="' + (cfg.indexar === false ? 'noindex, follow' : 'index, follow, max-image-preview:large') + '">' +
    '<link rel="canonical" href="' + url + '">' +
    '<link rel="icon" href="/favicon.ico" sizes="any"><link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png">' +
    '<meta property="og:type" content="website"><meta property="og:locale" content="es_PE"><meta property="og:site_name" content="Tarapoto Inmuebles">' +
    '<meta property="og:title" content="' + esc(cfg.h1) + '"><meta property="og:description" content="' + esc(cfg.descripcion) + '"><meta property="og:url" content="' + url + '">' +
    (cfg.imagen ? '<meta property="og:image" content="' + esc(cfg.imagen) + '"><meta name="twitter:card" content="summary_large_image">' : '<meta name="twitter:card" content="summary">') +
    '<script type="application/ld+json">' + jsonSeguro(ld) + '</script>' +
    TRACKING +
    '<style>' + CSS + '</style></head><body><div class="wrap">' +
    '<a class="top" href="' + SITE_URL + '/">← Tarapoto Inmuebles · Inicio</a>' +
    '<div class="body"><h1>' + esc(cfg.h1) + '</h1>' +
    cfg.introHtml +
    '<div class="nav">' + nav + '</div>' +
    cfg.contenidoHtml +
    '<a class="cta" href="' + wsp + '">💬 Escribir por WhatsApp</a>' +
    '<a class="cta alt" href="' + SITE_URL + '/">Ver todas las propiedades →</a>' +
    faqHtml +
    '<p class="pie">Tarapoto Inmuebles · Jr. Moyobamba 166, a media cuadra de la Plaza de Armas de Tarapoto · WhatsApp +51 992 226 283</p>' +
    '</div></div></body></html>';

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300' }
  });
}

export function tarjetas(props) {
  return '<div class="grid">' + props.map(p => {
    const tipo = TIPO_LABELS[p.tipo] || 'Propiedad';
    const metros = p.metros ? (p.metros + ' ' + (p.unidad_metros || 'm²')) : '';
    const precio = p.precio_real ? money(p.precio_real, p.moneda) : '';
    return '<a class="card" href="' + SITE_URL + '/p/' + encodeURIComponent(p.id) + '">' +
      (p.foto_principal ? '<img src="' + esc(p.foto_principal) + '" alt="' + esc((p.titulo || tipo) + ' - ' + tipo + ' en Tarapoto') + '" loading="lazy">' : '') +
      '<div class="c"><p class="t">' + esc(p.titulo || tipo) + '</p>' +
      '<p class="s">' + esc(tipo) + (metros ? ' · ' + esc(metros) : '') + '</p>' +
      (precio ? '<p class="p">' + esc(precio) + '</p>' : '') + '</div></a>';
  }).join('') + '</div>';
}

export function vacioHtml(texto) {
  return '<div class="vacio"><p><b>' + esc(texto) + '</b></p><p>Escríbenos por WhatsApp y te avisamos apenas tengamos algo que se ajuste a lo que buscas.</p></div>';
}

// Página genérica de listado de propiedades por tipo
export async function paginaCategoria(cfg) {
  const props = await cargarPropiedades(cfg.tipos);
  const contenido = props.length
    ? '<h2>' + esc(cfg.tituloListado) + ' (' + props.length + ')</h2>' + tarjetas(props)
    : vacioHtml(cfg.textoVacio);
  return renderPagina(Object.assign({}, cfg, {
    items: props,
    listaUrls: props.map(p => SITE_URL + '/p/' + encodeURIComponent(p.id)),
    contenidoHtml: contenido,
    imagen: props[0] && props[0].foto_principal,
    indexar: props.length > 0
  }));
}
