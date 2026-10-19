import { paginaCategoria } from './_lib/listado.js';

export async function onRequestGet() {
  return paginaCategoria({
  "ruta": "/alquiler-de-casas-en-tarapoto",
  "tipos": [
    "casa_alquiler"
  ],
  "titulo": "Alquiler de casas en Tarapoto | Tarapoto Inmuebles",
  "h1": "Alquiler de casas en Tarapoto",
  "descripcion": "Casas en alquiler en Tarapoto, San Martín. Fotos reales, ambientes, medidas y atención directa por WhatsApp con Tarapoto Inmuebles.",
  "introHtml": "<p>Casas en alquiler en Tarapoto publicadas por <b>Tarapoto Inmuebles</b>. Cada anuncio muestra fotos reales, ambientes, metraje y una referencia de ubicación. Escríbenos y coordinamos la visita.</p>",
  "tituloListado": "Casas en alquiler",
  "textoVacio": "Por ahora no hay casas en alquiler publicadas.",
  "whatsappMsg": "Hola, busco una casa en alquiler en Tarapoto. ¿Qué opciones tienen?",
  "faq": [
    [
      "¿Cómo alquilo una casa en Tarapoto?",
      "Elige la casa que te interese y escríbenos por WhatsApp al +51 992 226 283 para coordinar la visita y las condiciones del contrato."
    ],
    [
      "¿Dónde está la oficina?",
      "En el Jr. Moyobamba 166, Tarapoto, a media cuadra de la Plaza de Armas."
    ]
  ]
});
}
