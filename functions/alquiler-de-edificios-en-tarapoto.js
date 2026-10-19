import { paginaCategoria } from './_lib/listado.js';

export async function onRequestGet() {
  return paginaCategoria({
  "ruta": "/alquiler-de-edificios-en-tarapoto",
  "tipos": [
    "hotel_alquiler",
    "local_comercial_alquiler",
    "oficina_alquiler"
  ],
  "titulo": "Alquiler de edificios completos o por pisos en Tarapoto | Tarapoto Inmuebles",
  "h1": "Alquiler de edificios en Tarapoto: completos o por pisos",
  "descripcion": "Edificios, hoteles, locales y oficinas en alquiler en Tarapoto, completos o por pisos y ambientes. Fotos reales y atención directa por WhatsApp con Tarapoto Inmuebles.",
  "introHtml": "<p>Edificios, hoteles, locales y oficinas en alquiler en Tarapoto. Puedes alquilar el <b>edificio completo</b> o solo una parte: pisos, oficinas, locales o habitaciones, según lo que necesites. Aquí están las opciones publicadas; también te ayudamos a ubicar una que no esté listada.</p>",
  "tituloListado": "Edificios y locales en alquiler",
  "textoVacio": "Por ahora no hay edificios publicados.",
  "whatsappMsg": "Hola, busco un edificio o local en alquiler en Tarapoto. ¿Qué opciones tienen?",
  "faq": [
    [
      "¿Tienen edificios en alquiler en Tarapoto?",
      "Sí. Se alquilan completos o por partes (pisos, oficinas, locales). Publicamos los disponibles en esta página. Escríbenos por WhatsApp al +51 992 226 283 y te ayudamos a buscar según lo que necesites."
    ],
    [
      "¿Puedo publicar mi edificio?",
      "Sí. Escríbenos por WhatsApp."
    ]
  ]
});
}
