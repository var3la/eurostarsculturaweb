const STRAPI_URL = import.meta.env.STRAPI_URL;
const STRAPI_TOKEN = import.meta.env.STRAPI_TOKEN;

export const hasStrapi = Boolean(STRAPI_URL);

/** GET a la REST API de Strapi 5 (respuesta plana: sin `attributes`). Devuelve `json.data`. */
export async function strapi(path, params = {}) {
  const url = new URL(path, STRAPI_URL);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const res = await fetch(url, {
    headers: STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {},
  });
  if (!res.ok) throw new Error(`Strapi ${res.status} en ${url.pathname}`);
  return (await res.json()).data;
}

/** Las URLs de media de Strapi pueden ser relativas (/uploads/...) */
export function mediaUrl(media) {
  if (!media?.url) return '';
  return media.url.startsWith('http') ? media.url : new URL(media.url, STRAPI_URL).href;
}
