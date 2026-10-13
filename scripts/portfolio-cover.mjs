import { mkdir, readFile } from 'node:fs/promises';
import sharp from 'sharp';
const width = 1280,
  height = 960;
const frame = (w, h, label) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="10" fill="#faf9f5"/><path d="M0 28h${w}" stroke="#dedfd6"/><circle cx="14" cy="14" r="3" fill="#d7b394"/><circle cx="25" cy="14" r="3" fill="#c6d4b9"/><circle cx="36" cy="14" r="3" fill="#cad5cf"/><text x="60" y="18" font-family="Arial,sans-serif" font-size="9" fill="#45584c">${label}</text></svg>`,
  );
const background = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="${width}" height="${height}" fill="#183e35"/><path d="M65 560v-80a130 130 0 0 1 260 0v80M95 560v-80a100 100 0 0 1 200 0v80" fill="none" stroke="#f0c8ae" stroke-width="8" opacity=".15"/><g font-family="Arial,sans-serif"><text x="64" y="222" font-size="38" fill="#faf9f5" letter-spacing="-1.5">Pharmacy &amp;</text><text x="64" y="270" font-size="38" fill="#f0c8ae" letter-spacing="-1.5">everyday care.</text><text x="64" y="324" font-size="13" fill="#d5e0cf">One connected consumer experience.</text><text x="64" y="350" font-size="13" fill="#d5e0cf">Brand. Product. Campaign.</text><text x="64" y="925" font-size="12" fill="#faf9f5">ANTHONY VOLATILE / VOLATILE SOLUTIONS</text><text x="910" y="925" font-size="10" fill="#d5e0cf">SELF-INITIATED PORTFOLIO CONCEPT</text></g></svg>`,
);
const wordmark = (await readFile('public/brand/wordmark.svg', 'utf8')).replaceAll(
  '#183e35',
  '#faf9f5',
);
const logo = await sharp(Buffer.from(wordmark)).resize(340, 102).png().toBuffer();
const home = await sharp('portfolio-assets/screenshots/home-1440.png')
  .extract({ left: 0, top: 0, width: 1440, height: 950 })
  .resize(766, 516)
  .png()
  .toBuffer();
const member = await sharp('portfolio-assets/screenshots/member-1440.png')
  .extract({ left: 60, top: 270, width: 1320, height: 670 })
  .resize(530, 269)
  .png()
  .toBuffer();
const locator = await sharp('portfolio-assets/screenshots/locations-1440.png')
  .extract({ left: 75, top: 330, width: 1290, height: 620 })
  .resize(405, 195)
  .png()
  .toBuffer();
await mkdir('portfolio-assets', { recursive: true });
await sharp(background)
  .composite([
    { input: logo, left: 51, top: 66 },
    { input: frame(786, 562, 'alderandrow.example / everyday care'), left: 442, top: 112 },
    { input: home, left: 452, top: 148 },
    { input: frame(550, 310, 'Member space / fictional demo records'), left: 246, top: 553 },
    { input: member, left: 256, top: 588 },
    { input: frame(425, 242, 'Neighborhood finder / illustrative locations'), left: 827, top: 644 },
    { input: locator, left: 837, top: 681 },
  ])
  .png()
  .toFile('portfolio-assets/cover-1280x960.png');
console.log('Created portfolio-assets/cover-1280x960.png');
