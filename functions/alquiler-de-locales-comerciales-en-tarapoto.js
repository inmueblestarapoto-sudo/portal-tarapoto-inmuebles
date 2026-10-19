import { paginaCategoria } from './_lib/listado.js';

export async function onRequestGet() {
  return paginaCategoria({
  "ruta": "/alquiler-de-locales-comerciales-en-tarapoto",
  "tipos": [
    "local_comercial_alquiler"
  ],
  "titulo": "Alquiler de locales comerciales en Tarapoto | Tarapoto Inmuebles",
  "h1": "Alquiler de locales comerciales en Tarapoto",
  "descripcion": "Locales comerciales en alquiler en Tarapoto, San Martín. Tiendas, restaurantes y negocios en buena ubicación. Fotos reales y atención por WhatsApp.",
  "introHtml": "<p>Locales comerciales en alquiler en Tarapoto para tu tienda, restaurante, consultorio o negocio. Cada anuncio incluye fotos, metraje y ubicación referencial. Consulta disponibilidad por WhatsApp.</p>",
  "tituloListado": "Locales en alquiler",
  "textoVacio": "Por ahora no hay locales comerciales en alquiler publicados.",
  "whatsappMsg": "Hola, busco un local comercial en alquiler en Tarapoto. ¿Qué opciones tienen?",
  "faq": [
    [
      "¿Cómo consulto por locales comerciales en alquiler en Tarapoto?",
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
