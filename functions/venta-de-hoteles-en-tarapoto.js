import { paginaCategoria } from './_lib/listado.js';

export async function onRequestGet() {
  return paginaCategoria({
  "ruta": "/venta-de-hoteles-en-tarapoto",
  "tipos": [
    "hotel_venta"
  ],
  "titulo": "Venta de hoteles en Tarapoto | Tarapoto Inmuebles",
  "h1": "Hoteles en venta en Tarapoto",
  "descripcion": "Hoteles y hostales en venta en Tarapoto, San Martín. Oportunidad de inversión en una ciudad turística. Fotos reales y atención por WhatsApp.",
  "introHtml": "<p>Hoteles y hostales en venta en Tarapoto, una de las ciudades con más turismo de la selva peruana. Cada anuncio incluye fotos reales, metraje y características. Para inversionistas y operadores, coordinamos visitas por WhatsApp.</p>",
  "tituloListado": "Hoteles en venta",
  "textoVacio": "Por ahora no hay hoteles en venta publicados.",
  "whatsappMsg": "Hola, me interesa comprar un hotel en Tarapoto. ¿Qué opciones tienen?",
  "faq": [
    [
      "¿Cómo consulto por hoteles en venta en Tarapoto?",
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
