import { paginaCategoria } from './_lib/listado.js';

export async function onRequestGet() {
  return paginaCategoria({
    ruta: '/alquiler-en-tarapoto',
    tipos: ['casa_alquiler', 'local_comercial_alquiler', 'oficina_alquiler', 'terreno_alquiler', 'hotel_alquiler'],
    titulo: 'Alquiler de casas, locales y oficinas en Tarapoto | Tarapoto Inmuebles',
    h1: 'Alquiler en Tarapoto: casas, locales y oficinas',
    descripcion: 'Casas, locales comerciales, oficinas y más en alquiler en Tarapoto, San Martín. Fotos reales, medidas y atención directa por WhatsApp con Tarapoto Inmuebles.',
    introHtml:
      '<p>Aquí están las propiedades en alquiler que manejamos en Tarapoto: casas, locales comerciales, oficinas y otros espacios. Cada anuncio incluye fotos, metraje, características y una ubicación referencial.</p>' +
      '<p>¿Tienes un inmueble para alquilar? También lo podemos publicar: escríbenos por WhatsApp o usa la opción "vende o alquila tu propiedad" en el portal.</p>',
    tituloListado: 'Propiedades en alquiler',
    textoVacio: 'Por ahora no hay propiedades en alquiler publicadas.',
    whatsappMsg: 'Hola, estoy buscando un alquiler en Tarapoto. ¿Qué opciones tienen?',
    faq: [
      ['¿Cómo alquilo una propiedad?', 'Elige la que te interese y escríbenos por WhatsApp al +51 992 226 283 para coordinar la visita y los detalles del contrato.'],
      ['¿Puedo publicar mi propiedad para alquilar?', 'Sí. Escríbenos por WhatsApp o usa la opción para publicar tu propiedad en el portal.']
    ]
  });
}
