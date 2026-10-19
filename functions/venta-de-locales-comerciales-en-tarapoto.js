import { paginaCategoria } from './_lib/listado.js';

export async function onRequestGet() {
  return paginaCategoria({
  "ruta": "/venta-de-locales-comerciales-en-tarapoto",
  "tipos": [
    "local_comercial_venta"
  ],
  "titulo": "Venta de locales comerciales en Tarapoto | Tarapoto Inmuebles",
  "h1": "Locales comerciales en venta en Tarapoto",
  "descripcion": "Locales comerciales en venta en Tarapoto, San Martín. Fotos reales, metraje y atención directa por WhatsApp con Tarapoto Inmuebles.",
  "introHtml": "<p>Locales comerciales en venta en Tarapoto, una buena opción para invertir o instalar tu propio negocio. Cada anuncio muestra fotos, metraje y ubicación referencial.</p>",
  "tituloListado": "Locales en venta",
  "textoVacio": "Por ahora no hay locales comerciales en venta publicados.",
  "whatsappMsg": "Hola, busco un local comercial en venta en Tarapoto. ¿Qué opciones tienen?",
  "faq": [
    [
      "¿Cómo consulto por locales comerciales en venta en Tarapoto?",
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
