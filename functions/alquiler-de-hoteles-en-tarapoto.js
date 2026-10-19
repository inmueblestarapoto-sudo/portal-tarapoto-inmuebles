import { paginaCategoria } from './_lib/listado.js';

export async function onRequestGet() {
  return paginaCategoria({
  "ruta": "/alquiler-de-hoteles-en-tarapoto",
  "tipos": [
    "hotel_alquiler"
  ],
  "titulo": "Alquiler de hoteles en Tarapoto | Tarapoto Inmuebles",
  "h1": "Alquiler de hoteles en Tarapoto",
  "descripcion": "Hoteles y hostales en alquiler en Tarapoto, completos o por habitaciones y pisos. Fotos reales y atención por WhatsApp con Tarapoto Inmuebles.",
  "introHtml": "<p>Hoteles en alquiler en Tarapoto, <b>completos o por habitaciones y pisos</b>. Cada anuncio incluye fotos y características. Escríbenos para ver disponibilidad.</p>",
  "tituloListado": "Hoteles en alquiler",
  "textoVacio": "Por ahora no hay hoteles en alquiler publicados.",
  "whatsappMsg": "Hola, busco un hotel en alquiler en Tarapoto. ¿Qué opciones tienen?",
  "faq": [
    [
      "¿Cómo consulto por hoteles en alquiler en Tarapoto?",
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
