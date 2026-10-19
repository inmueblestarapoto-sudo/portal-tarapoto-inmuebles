import { paginaCategoria } from './_lib/listado.js';

export async function onRequestGet() {
  return paginaCategoria({
    ruta: '/casas-en-venta-tarapoto',
    tipos: ['casa_venta'],
    titulo: 'Casas en venta en Tarapoto | Tarapoto Inmuebles',
    h1: 'Casas en venta en Tarapoto',
    descripcion: 'Casas en venta en Tarapoto, San Martín. Mira fotos, metraje, ambientes y ubicación referencial, y consulta directo por WhatsApp con Tarapoto Inmuebles.',
    introHtml:
      '<p>Estas son las casas en venta que tenemos publicadas en Tarapoto. Cada ficha muestra fotos, metraje, ambientes (habitaciones, baños, cochera y más) y una referencia de ubicación. Si una te interesa, te acompañamos a visitarla.</p>' +
      '<h2>Consejos para comprar una casa</h2>' +
      '<p>Revisa que la propiedad esté saneada (partida registral al día, sin cargas), confirma el estado de las instalaciones y pide siempre ver el inmueble antes de decidir. Escríbenos y te orientamos paso a paso.</p>',
    tituloListado: 'Casas disponibles',
    textoVacio: 'Por ahora no hay casas en venta publicadas.',
    whatsappMsg: 'Hola, estoy buscando una casa en venta en Tarapoto. ¿Qué opciones tienen?',
    faq: [
      ['¿Cómo agendo una visita a una casa?', 'Escríbenos por WhatsApp al +51 992 226 283 con el nombre de la casa que te interesa y coordinamos la visita.'],
      ['¿Dónde atienden?', 'En el Jr. Moyobamba 166, Tarapoto, a media cuadra de la Plaza de Armas.']
    ]
  });
}
