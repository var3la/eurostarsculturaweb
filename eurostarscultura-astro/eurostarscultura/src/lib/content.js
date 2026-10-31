import { hasStrapi, strapi, mediaUrl } from './strapi.js';
import { exposicionesFallback, wineBooksFallback } from '../data/fallback.js';

const dtf = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', timeZone: 'UTC' });
// es-ES devuelve "1 de abril"; el diseño usa "1 abril"
const fmt = { format: (d) => dtf.format(d).replace(' de ', ' ') };
const NBSP_DOT = '\u00a0·\u00a0';

function dateLabel(start, end) {
  if (!start) return '';
  const s = fmt.format(new Date(start));
  if (!end || end === start) return s;
  return `${s} – ${fmt.format(new Date(end))}`;
}

function normalize(item, base) {
  return {
    slug: item.slug,
    heading: [item.title, item.subtitle].filter(Boolean).join(' — '),
    meta: [dateLabel(item.startDate, item.endDate), item.hotel].filter(Boolean).join(NBSP_DOT),
    image: mediaUrl(item.image),
    href: `/${base}/${item.slug}`,
  };
}

// Content types esperados en Strapi: `exposiciones` y `wine-books` (ajusta a tus API IDs)
export async function getExposiciones() {
  const data = hasStrapi
    ? await strapi('/api/exposiciones', { populate: '*', sort: 'startDate:desc' })
    : exposicionesFallback;
  return data.map((i) => normalize(i, 'exposiciones'));
}

export async function getWineBooks() {
  const data = hasStrapi
    ? await strapi('/api/wine-books', { populate: '*', sort: 'startDate:asc' })
    : wineBooksFallback;
  return data.map((i) => normalize(i, 'winebooks'));
}
