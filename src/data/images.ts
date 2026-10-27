import type { ImageMetadata } from 'astro';
import raw from './images.json';
import { services, type Service } from '../i18n/routes';

export type Photo = {
  file: string;
  service: Service;
  caption_fr: string;
  caption_en: string;
  location: string;
  featured: boolean;
  src: ImageMetadata;
};

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.{jpg,jpeg,png,webp}', { eager: true });

const photos: Photo[] = raw.map((entry, i) => {
  const where = `images.json entry ${i} (${entry.file})`;
  if (!services.includes(entry.service as Service)) throw new Error(`${where}: service must be one of ${services.join(', ')}`);
  if (!entry.caption_fr?.trim() || !entry.caption_en?.trim()) throw new Error(`${where}: caption_fr and caption_en are required`);
  if (!/^[a-z0-9-]+\.(jpe?g|png|webp)$/.test(entry.file)) console.warn(`[images] ${where}: filename should be lowercase-hyphenated`);
  const mod = files[`../assets/photos/${entry.file}`];
  if (!mod) throw new Error(`${where}: file not found in src/assets/photos/`);
  return { ...(entry as Omit<Photo, 'src'>), src: mod.default };
});

/** Featured first within a service, then images.json order. Without a service: grouped in service order. */
export function getPhotos(service?: Service): Photo[] {
  const list = service ? [service] : services;
  return list.flatMap((s) => {
    const own = photos.filter((p) => p.service === s);
    return [...own.filter((p) => p.featured), ...own.filter((p) => !p.featured)];
  });
}

/** Photo used for a page's Open Graph image. */
export function getOgPhoto(service?: Service): Photo {
  return getPhotos(service)[0];
}
