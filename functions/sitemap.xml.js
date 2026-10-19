// Sitemap dinámico: lista la página principal y todas las propiedades activas.
// Se sirve en https://tarapotoinmuebles.pe/sitemap.xml y se actualiza solo
// cada vez que se aprueba (o se desactiva) una propiedad.

const SUPABASE_URL = 'https://tqistvisnbcmiocmimos.supabase.co';
const SUPABASE_KEY = 'sb_publishable_NyCjJkq-17DqOv-5GVg42Q_Cvt2Bp19';
const SITE_URL = 'https://tarapotoinmuebles.pe';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function onRequestGet() {
  let filas = [];
  try {
    const res = await fetch(
      SUPABASE_URL + '/rest/v1/propiedades?estado=eq.activo&select=id,created_at&order=created_at.desc&limit=1000',
      { headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY } }
    );
    const data = await res.json();
    if (Array.isArray(data)) filas = data;
  } catch (err) {
    filas = [];
  }

  const urls = [
    '  <url><loc>' + SITE_URL + '/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>'
  ].concat(filas.map(f => {
    const lm = f.created_at ? '<lastmod>' + esc(String(f.created_at).slice(0, 10)) + '</lastmod>' : '';
    return '  <url><loc>' + SITE_URL + '/p/' + esc(encodeURIComponent(f.id)) + '</loc>' + lm +
           '<changefreq>weekly</changefreq><priority>0.8</priority></url>';
  }));

  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls.join('\n') + '\n</urlset>\n';

  return new Response(xml, {
    status: 200,
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=600' }
  });
}
