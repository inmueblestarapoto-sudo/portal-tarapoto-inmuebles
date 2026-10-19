import { paginaCategoria } from './_lib/listado.js';

export async function onRequestGet() {
  return paginaCategoria({
  "ruta": "/alquiler-de-terrenos-en-tarapoto",
  "tipos": [
    "terreno_alquiler"
  ],
  "titulo": "Alquiler de terrenos en Tarapoto | Tarapoto Inmuebles",
  "h1": "Alquiler de terrenos en Tarapoto",
  "descripcion": "Terrenos en alquiler en Tarapoto, San Martín, para cultivo, depósito o negocio. Fotos reales y atención por WhatsApp con Tarapoto Inmuebles.",
  "introHtml": "<p>Terrenos en alquiler en Tarapoto para cultivo, depósito, estacionamiento o tu negocio. Cada anuncio incluye fotos, medidas y ubicación referencial.</p>",
  "tituloListado": "Terrenos en alquiler",
  "textoVacio": "Por ahora no hay terrenos en alquiler publicados.",
  "whatsappMsg": "Hola, busco un terreno en alquiler en Tarapoto. ¿Qué opciones tienen?",
  "faq": [
    [
      "¿Cómo consulto por terrenos en alquiler en Tarapoto?",
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
