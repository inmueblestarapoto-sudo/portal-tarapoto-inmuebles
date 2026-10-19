import { renderPagina, cargarTodosLosLotes, esc } from './_lib/listado.js';

const ETIQUETA = { disponible: 'Disponible', separado: 'Separado', vendido: 'Vendido' };

function nombreProyecto(slug) {
  return String(slug || '').replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export async function onRequestGet() {
  const todos = await cargarTodosLosLotes();
  const proyectos = {};
  todos.forEach(l => { (proyectos[l.proyecto] = proyectos[l.proyecto] || []).push(l); });
  const slugs = Object.keys(proyectos);

  const totalDisp = todos.filter(l => l.estado === 'disponible').length;
  const medidas = todos.map(l => parseFloat(l.m2) || 0).filter(Boolean);
  const min = medidas.length ? Math.min.apply(null, medidas) : null;
  const max = medidas.length ? Math.max.apply(null, medidas) : null;

  const bloques = slugs.map(slug => {
    const ls = proyectos[slug];
    const disp = ls.filter(l => l.estado === 'disponible').length;
    const ancla = slug === 'coperholta' ? '/#coperholta' : '/';
    return '<h2>Proyecto ' + esc(nombreProyecto(slug)) + ' · ' + ls.length + ' lotes, ' + disp + ' disponibles</h2>' +
      '<div class="lotes">' + ls.map(l =>
        '<a class="lote ' + esc(l.estado) + '" href="' + (slug === 'coperholta' ? '/#coperholta-' + encodeURIComponent(l.n) : ancla) + '"><b>Lote ' + esc(l.n) + '</b>' +
        (parseFloat(l.m2) ? esc(parseFloat(l.m2)) + ' m²<br>' : '') + esc(ETIQUETA[l.estado] || l.estado) + '</a>').join('') + '</div>' +
      (slug === 'coperholta' ? '<p style="margin-top:14px"><a href="/#coperholta">Ver el plano interactivo de ' + esc(nombreProyecto(slug)) + ' →</a></p>' : '');
  }).join('');

  const resumen = slugs.length
    ? 'Hoy hay <b>' + totalDisp + ' lotes disponibles</b> en ' + slugs.length + ' proyecto' + (slugs.length > 1 ? 's' : '') +
      (min ? ', con medidas de ' + min + ' a ' + max + ' m²' : '') + '.'
    : '';

  return renderPagina({
    ruta: '/lotes-en-tarapoto',
    titulo: 'Lotes en venta en Tarapoto – proyectos y lotes urbanos | Tarapoto Inmuebles',
    h1: 'Lotes en venta en Tarapoto: proyectos y lotes urbanos',
    descripcion: 'Lotes urbanos y proyectos de lotes en Tarapoto, San Martín' + (min ? ' desde ' + min + ' hasta ' + max + ' m²' : '') + '. Mira cuáles están disponibles y consulta por WhatsApp en Tarapoto Inmuebles.',
    introHtml:
      '<p>Reunimos en un solo lugar los <b>proyectos de lotes en Tarapoto</b>: cada proyecto muestra sus lotes, su medida y si está disponible, separado o vendido. ' + resumen + '</p>' +
      '<p>Los precios se consultan directo por WhatsApp. ¿Tienes un proyecto de lotes? Puedes publicarlo en este portal.</p>',
    contenidoHtml: bloques,
    whatsappMsg: 'Hola, vi los lotes en tarapotoinmuebles.pe y quisiera más información.',
    faq: [
      ['¿Cómo consulto el precio de un lote?', 'Escríbenos por WhatsApp al +51 992 226 283 indicando el proyecto y el número de lote.'],
      ['¿Puedo visitar el terreno antes de decidir?', 'Sí. Coordinamos la visita contigo por WhatsApp.'],
      ['¿Puedo publicar mi proyecto de lotes en el portal?', 'Sí. Escríbenos por WhatsApp y te explicamos cómo publicarlo.']
    ],
    indexar: slugs.length > 0
  });
}
