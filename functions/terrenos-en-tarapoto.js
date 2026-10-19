import { paginaCategoria, cargarTodosLosLotes, esc } from './_lib/listado.js';

export async function onRequestGet() {
  const lotes = await cargarTodosLosLotes();
  const disp = lotes.filter(l => l.estado === 'disponible');
  const coperholta = disp.length
    ? '<p><b>Proyectos de lotes:</b> ' + disp.length + ' lotes disponibles, desde ' +
      Math.min.apply(null, disp.map(l => parseFloat(l.m2) || 0).filter(Boolean)) + ' hasta ' +
      Math.max.apply(null, disp.map(l => parseFloat(l.m2) || 0)) + ' m². <a href="/lotes-en-tarapoto">Ver los lotes →</a></p>'
    : '';
  return paginaCategoria({
    ruta: '/terrenos-en-tarapoto',
    tipos: ['terreno_venta'],
    titulo: 'Terrenos en venta en Tarapoto | Tarapoto Inmuebles',
    h1: 'Terrenos en venta en Tarapoto',
    descripcion: 'Terrenos y lotes en venta en Tarapoto, San Martín. Fotos reales, medidas, ubicación referencial y atención directa por WhatsApp con Tarapoto Inmuebles.',
    introHtml:
      '<p>Aquí encuentras terrenos y lotes en venta en Tarapoto y alrededores, publicados por <b>Tarapoto Inmuebles</b>, una inmobiliaria con oficina en el centro de la ciudad, a media cuadra de la Plaza de Armas. Cada anuncio muestra fotos reales, metraje y una ubicación referencial, y puedes consultar directo por WhatsApp.</p>' + coperholta +
      '<h2>Antes de comprar un terreno</h2>' +
      '<p>Para decidir con tranquilidad conviene revisar la <b>partida registral</b> del predio, que el vendedor sea el titular, que no tenga cargas o gravámenes, el acceso (vía y servicios cercanos) y la zonificación de la zona. Si necesitas orientación, escríbenos y te ayudamos a ordenar esa revisión.</p>',
    tituloListado: 'Terrenos disponibles',
    textoVacio: 'Por ahora no hay terrenos publicados.',
    whatsappMsg: 'Hola, estoy buscando un terreno en Tarapoto. ¿Qué opciones tienen disponibles?',
    faq: [
      ['¿Cómo puedo ver un terreno en Tarapoto?', 'Escríbenos por WhatsApp al +51 992 226 283 y coordinamos una visita al terreno que te interese.'],
      ['¿Dónde está la oficina de Tarapoto Inmuebles?', 'En el Jr. Moyobamba 166, Tarapoto, a media cuadra de la Plaza de Armas.'],
      ['¿Los terrenos tienen fotos reales?', 'Sí. Cada anuncio incluye fotos de la propiedad y una ubicación referencial.']
    ]
  });
}
