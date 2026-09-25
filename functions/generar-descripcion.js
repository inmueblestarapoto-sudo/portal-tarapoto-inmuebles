// Genera una descripción de venta/alquiler para una propiedad usando IA,
// a partir SOLO de los datos que el usuario ya ingresó en el formulario.
// Requiere la variable de entorno ANTHROPIC_API_KEY configurada en Cloudflare Pages
// (Workers & Pages → tu proyecto → Settings → Environment variables → Add variable,
// marcándola como "Encrypt" / secret). Es gratis, no requiere plan pago.
// Se sirve en https://tarapotoinmuebles.pe/generar-descripcion

const TIPO_LABELS = {
  casa_venta: 'casa en venta', casa_alquiler: 'casa en alquiler',
  terreno_venta: 'terreno en venta', terreno_alquiler: 'terreno en alquiler',
  local_comercial_venta: 'local comercial en venta', local_comercial_alquiler: 'local comercial en alquiler',
  oficina_venta: 'oficina en venta', oficina_alquiler: 'oficina en alquiler',
  hotel_venta: 'hotel/hospedaje en venta', hotel_alquiler: 'hotel/hospedaje en alquiler'
};

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json; charset=utf-8'
};

export async function onRequestOptions() {
  return new Response('', { status: 200, headers: CORS_HEADERS });
}

export async function onRequestPost(context) {
  const apiKey = context.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Falta configurar ANTHROPIC_API_KEY en Cloudflare Pages.' }), { status: 500, headers: CORS_HEADERS });
  }

  let datos;
  try {
    datos = await context.request.json();
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Datos inválidos.' }), { status: 400, headers: CORS_HEADERS });
  }

  const tipoLegible = TIPO_LABELS[datos.tipo] || datos.tipo || 'propiedad';
  const moneda = datos.moneda === 'PEN' ? 'soles' : 'dólares';

  const hechos = [
    'Tipo: ' + tipoLegible,
    datos.direccion ? ('Dirección: ' + datos.direccion) : null,
    datos.referencia ? ('Referencia de ubicación: ' + datos.referencia) : null,
    datos.metros ? ('Tamaño: ' + datos.metros + ' ' + (datos.unidad_metros || 'm²')) : null,
    datos.precio_real ? ('Precio: ' + datos.precio_real + ' ' + moneda) : null,
    datos.caracteristicas ? ('Características: ' + datos.caracteristicas) : null,
    datos.destacados ? ('Lo que más destaca: ' + datos.destacados) : null
  ].filter(Boolean).join('\n');

  if (!hechos.trim()) {
    return new Response(JSON.stringify({ error: 'Faltan datos de la propiedad para generar la descripción.' }), { status: 400, headers: CORS_HEADERS });
  }

  const prompt = 'Escribe en español, tono vendedor pero sobrio, 80-120 palabras, usa SOLO los datos dados, no inventes nada que no esté en la lista. ' +
    'No uses signos de exclamación en exceso ni emojis. No repitas la palabra "propiedad" más de dos veces. ' +
    'Escribe la descripción de venta/alquiler para estos datos:\n\n' + hechos;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!res.ok) {
      const errBody = await res.text();
      return new Response(JSON.stringify({ error: 'No se pudo generar la descripción. ' + errBody.slice(0, 200) }), { status: 502, headers: CORS_HEADERS });
    }

    const result = await res.json();
    const texto = (result.content && result.content[0] && result.content[0].text || '').trim();
    if (!texto) {
      return new Response(JSON.stringify({ error: 'La IA no devolvió texto. Intenta de nuevo.' }), { status: 502, headers: CORS_HEADERS });
    }

    return new Response(JSON.stringify({ descripcion: texto }), { status: 200, headers: CORS_HEADERS });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Error al conectar con la IA.' }), { status: 500, headers: CORS_HEADERS });
  }
}
