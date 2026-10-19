import { paginaCategoria } from './_lib/listado.js';

export async function onRequestGet() {
  return paginaCategoria({
  "ruta": "/hoteles-en-tarapoto",
  "tipos": [
    "hotel_venta",
    "hotel_alquiler"
  ],
  "titulo": "Hoteles en venta y alquiler en Tarapoto | Tarapoto Inmuebles",
  "h1": "Hoteles en venta y alquiler en Tarapoto",
  "descripcion": "Hoteles, hostales y edificios hoteleros en venta y alquiler en Tarapoto, San Martín. Fotos reales, medidas y atención directa por WhatsApp con Tarapoto Inmuebles.",
  "introHtml": "<p>Hoteles y hostales en venta y en alquiler en Tarapoto, completos o por habitaciones y pisos, una de las ciudades con más turismo de la selva peruana. Cada anuncio incluye fotos reales, metraje, características y una referencia de ubicación. Para inversionistas y operadores, escríbenos y coordinamos una visita.</p><h2>Antes de invertir en un hotel</h2><p>Conviene revisar la situación legal del predio, licencias de funcionamiento, número de habitaciones, estado de las instalaciones y el historial de ocupación. Te ayudamos a ordenar esa información.</p>",
  "tituloListado": "Hoteles disponibles",
  "textoVacio": "Por ahora no hay hoteles publicados.",
  "whatsappMsg": "Hola, me interesa un hotel en Tarapoto. ¿Qué opciones tienen?",
  "faq": [
    [
      "¿Tienen hoteles en venta en Tarapoto?",
      "Publicamos los disponibles en esta página. Escríbenos por WhatsApp al +51 992 226 283 para más detalles y visitas."
    ],
    [
      "¿También hay hoteles en alquiler?",
      "Sí. Hay opciones de alquiler del hotel completo o por separado (habitaciones o pisos). Escríbenos por WhatsApp para ver la disponibilidad."
    ],
    [
      "¿Puedo publicar mi hotel?",
      "Sí. Escríbenos por WhatsApp o usa la opción de publicar en el portal."
    ]
  ]
});
}
