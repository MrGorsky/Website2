// Post-build: every image Astro generated has had all metadata (including GPS) stripped by sharp.
// Write back creator/copyright/credit so they travel with the files Google indexes.
import { exiftool } from 'exiftool-vendored';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

const NAME = 'Hamel Photo';
const CREATOR = 'Jo Hamel';
const year = new Date().getFullYear();
const COPYRIGHT = `© ${year} ${NAME}. All rights reserved.`;

const dirs = ['dist/_astro', 'dist/og'];
const files = [];
for (const dir of dirs) {
  for (const f of await readdir(dir).catch(() => [])) {
    if (/\.(jpe?g|webp|avif)$/i.test(f)) files.push(join(dir, f));
  }
}

const tags = {
  'GPS:all': '',
  'XMP-dc:Creator': [CREATOR],
  'XMP-dc:Rights': COPYRIGHT,
  'XMP-photoshop:Credit': NAME,
  'XMP-xmpRights:Marked': true,
  'EXIF:Artist': CREATOR,
  'EXIF:Copyright': COPYRIGHT,
};
const iptc = { 'IPTC:By-line': [CREATOR], 'IPTC:CopyrightNotice': COPYRIGHT, 'IPTC:Credit': NAME };

let done = 0;
const queue = [...files];
await Promise.all(
  Array.from({ length: 8 }, async () => {
    for (let f = queue.shift(); f; f = queue.shift()) {
      const isJpeg = /\.jpe?g$/i.test(f);
      try {
        await exiftool.write(f, isJpeg ? { ...tags, ...iptc } : tags, ['-overwrite_original']);
        done++;
      } catch (err) {
        console.warn(`[photo-metadata] ${f}: ${err.message}`);
      }
    }
  }),
);
await exiftool.end();
console.log(`[photo-metadata] tagged ${done}/${files.length} images`);
