import { paginaCategoria } from './_lib/listado.js';

export async function onRequestGet() {
  return paginaCategoria({
  "ruta": "/venta-de-oficinas-en-tarapoto",
  "tipos": [
    "oficina_venta"
  ],
  "titulo": "Venta de oficinas en Tarapoto | Tarapoto Inmuebles",
  "h1": "Oficinas en venta en Tarapoto",
  "descripcion": "Oficinas en venta en Tarapoto, San Martín. Fotos reales, metraje y atención directa por WhatsApp con Tarapoto Inmuebles.",
  "introHtml": "<p>Oficinas en venta en Tarapoto para tu empresa, consultorio o inversión. Cada anuncio incluye fotos, metraje y ubicación referencial.</p>",
  "tituloListado": "Oficinas en venta",
  "textoVacio": "Por ahora no hay oficinas en venta publicadas.",
  "whatsappMsg": "Hola, busco una oficina en venta en Tarapoto. ¿Qué opciones tienen?",
  "faq": [
    [
      "¿Cómo consulto por oficinas en venta en Tarapoto?",
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
