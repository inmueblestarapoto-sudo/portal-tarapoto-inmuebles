import { paginaCategoria } from './_lib/listado.js';

export async function onRequestGet() {
  return paginaCategoria({
  "ruta": "/casas-en-tarapoto",
  "tipos": [
    "casa_venta",
    "casa_alquiler"
  ],
  "titulo": "Casas en Tarapoto | Tarapoto Inmuebles",
  "h1": "Casas en Tarapoto: venta y alquiler",
  "descripcion": "Casas en venta y en alquiler en Tarapoto, San Martín. Fotos reales, ambientes, medidas y atención directa por WhatsApp con Tarapoto Inmuebles.",
  "introHtml": "<p>Casas en <b>venta y en alquiler</b> en Tarapoto publicadas por Tarapoto Inmuebles. Cada ficha muestra fotos reales, ambientes, metraje y una referencia de ubicación. Escríbenos y coordinamos la visita.</p>",
  "tituloListado": "Casas disponibles",
  "textoVacio": "Por ahora no hay casas publicadas.",
  "whatsappMsg": "Hola, busco una casa en Tarapoto. ¿Qué opciones tienen?",
  "faq": [
    [
      "¿Cómo consulto por casas en Tarapoto?",
      "Escríbenos por WhatsApp al +51 992 226 283 y coordinamos la visita."
    ],
    [
      "¿Dónde está la oficina de Tarapoto Inmuebles?",
      "En el Jr. Moyobamba 166, Tarapoto, a media cuadra de la Plaza de Armas."
    ],
    [
      "¿Puedo publicar mi propiedad?",
      "Sí. Escríbenos por WhatsApp o usa la opción de publicar en el portal."
    ]
  ]
});
}
