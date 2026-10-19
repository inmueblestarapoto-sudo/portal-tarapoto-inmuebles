import { paginaCategoria } from './_lib/listado.js';

export async function onRequestGet() {
  return paginaCategoria({
  "ruta": "/alquiler-de-oficinas-en-tarapoto",
  "tipos": [
    "oficina_alquiler"
  ],
  "titulo": "Alquiler de oficinas en Tarapoto | Tarapoto Inmuebles",
  "h1": "Alquiler de oficinas en Tarapoto",
  "descripcion": "Oficinas en alquiler en Tarapoto, San Martín. Fotos reales, metraje y atención directa por WhatsApp con Tarapoto Inmuebles.",
  "introHtml": "<p>Oficinas en alquiler en Tarapoto para tu empresa, consultorio o negocio. Cada anuncio incluye fotos, metraje y ubicación referencial. Consulta disponibilidad por WhatsApp.</p>",
  "tituloListado": "Oficinas en alquiler",
  "textoVacio": "Por ahora no hay oficinas en alquiler publicadas.",
  "whatsappMsg": "Hola, busco una oficina en alquiler en Tarapoto. ¿Qué opciones tienen?",
  "faq": [
    [
      "¿Cómo alquilo una oficina en Tarapoto?",
      "Escríbenos por WhatsApp al +51 992 226 283 indicando metraje y zona que buscas."
    ],
    [
      "¿Puedo publicar mi oficina para alquilar?",
      "Sí. Escríbenos y la publicamos en el portal."
    ]
  ]
});
}
