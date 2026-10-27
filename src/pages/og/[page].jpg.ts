import type { APIRoute, GetStaticPaths } from 'astro';
import sharp from 'sharp';
import { join } from 'node:path';
import { getOgPhoto } from '../../data/images';
import type { PageKey, Service } from '../../i18n/routes';

const pageService: Record<PageKey, Service | undefined> = {
  home: undefined,
  event: 'event',
  headshot: 'headshot',
  realestate: 'realestate',
  privacy: undefined,
};

export const getStaticPaths = (() =>
  Object.keys(pageService).map((page) => ({ params: { page } }))) satisfies GetStaticPaths;

// 1200×630 crop of the page's featured photo, shared by the FR and EN versions of a page.
export const GET: APIRoute = async ({ params }) => {
  const photo = getOgPhoto(pageService[params.page as PageKey]);
  const body = await sharp(join(process.cwd(), 'src/assets/photos', photo.file))
    .resize(1200, 630, { fit: 'cover', position: sharp.strategy.attention })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  return new Response(new Uint8Array(body), { headers: { 'Content-Type': 'image/jpeg' } });
};
