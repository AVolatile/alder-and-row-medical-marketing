import campaignRecords from '../src/data/campaigns.json' with { type: 'json' };
import emailRecords from '../src/data/emails.json' with { type: 'json' };
import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
const palette = {
  forest: '#183e35',
  peach: '#f0c8ae',
  sage: '#dde8d9',
  yellow: '#eee5bc',
  lilac: '#e6dfee',
  sand: '#eeeae0',
  cream: '#faf9f5',
};
const campaigns = campaignRecords.map((c) => ({ ...c, headline: c.headline.split('\n') }));
const escape = (t) => t.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const symbol = (x, y, size, color) =>
  `<g transform="translate(${x} ${y}) scale(${size / 40})" fill="none" stroke="${color}" stroke-linejoin="round"><path d="M4 35V17C4 9.27 10.27 3 18 3s14 6.27 14 14v18" stroke-width="5"/><path d="M12 35V18a6 6 0 0 1 12 0v17M3 35h30" stroke-width="4"/><path d="M18 24v12" stroke-width="3"/></g>`;
const logo = (x, y, size, color) =>
  `${symbol(x, y, size, color)}<text x="${x + size * 1.2}" y="${y + size * 0.78}" font-size="${size * 0.85}" font-weight="600" letter-spacing="-${size * 0.035}" fill="${color}">alder &amp; row</text><text x="${x + size * 1.22}" y="${y + size * 1.12}" font-size="${size * 0.19}" letter-spacing="${size * 0.02}" fill="${color}">PHARMACY &amp; EVERYDAY CARE</text>`;
function creative(c, width, height) {
  const color = c.color === 'forest' ? palette.cream : palette.forest;
  const margin = width * 0.082;
  const vertical = height / width > 1.5;
  const font = width * 0.096;
  const start = vertical ? height * 0.28 : height * 0.32;
  const archW = width * 0.68;
  const archH = height * 0.67;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escape(c.headline.join(' '))} Alder and Row portfolio concept"><rect width="${width}" height="${height}" fill="${palette[c.color]}"/><g font-family="Arial,sans-serif">${logo(margin, margin, width * 0.083, color)}<g opacity=".12"><path d="M${width * 0.55} ${height * 1.1}V${height * 0.72}a${archW / 2} ${archW / 2} 0 0 1 ${archW} 0v${archH}" fill="none" stroke="${color}" stroke-width="${width * 0.037}"/>${symbol(width * 0.77, height * 0.67, width * 0.25, color)}</g>${c.headline.map((line, i) => `<text x="${margin}" y="${start + i * font * 1.17}" fill="${color}" font-size="${font}" font-weight="600" letter-spacing="-${font * 0.055}">${escape(line)}</text>`).join('')}<text x="${margin}" y="${start + (c.headline.length - 1) * font * 1.17 + font * 0.82}" fill="${color}" font-size="${width * 0.025}">${escape(c.copy)}</text><rect x="${margin}" y="${height - margin - width * 0.065}" width="${width * 0.46}" height="${width * 0.066}" rx="${width * 0.007}" fill="${color}"/><text x="${margin + width * 0.025}" y="${height - margin - width * 0.024}" fill="${palette[c.color]}" font-size="${width * 0.024}" font-weight="600">${escape(c.cta)} ↗</text><text x="${margin}" y="${height - margin * 0.35}" fill="${color}" font-size="${width * 0.015}" letter-spacing="${width * 0.0015}">PORTFOLIO CONCEPT · FICTIONAL SERVICES</text></g></svg>`;
}
await mkdir('public/brand', { recursive: true });
await mkdir('public/campaign/social', { recursive: true });
await mkdir('public/campaign/display', { recursive: true });
await mkdir('public/campaign/posters', { recursive: true });
await mkdir('public/campaign/email', { recursive: true });
const mark = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${palette.forest}"/>${symbol(15, 12, 40, palette.peach)}</svg>`;
await writeFile('public/brand/favicon.svg', mark);
await writeFile(
  'public/brand/symbol.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="280" viewBox="0 0 256 280">${symbol(16, 10, 250, palette.forest)}</svg>`,
);
await writeFile(
  'public/brand/wordmark.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="180" viewBox="0 0 600 180"><g font-family="Arial,sans-serif">${logo(20, 35, 88, palette.forest)}</g></svg>`,
);
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="${palette.forest}"/><g font-family="Arial,sans-serif">${logo(85, 70, 70, palette.cream)}<text x="85" y="295" font-size="85" fill="${palette.cream}" font-weight="600" letter-spacing="-4">More life.</text><text x="85" y="400" font-size="85" fill="${palette.peach}" font-weight="600" letter-spacing="-4">Less running around.</text><text x="85" y="552" font-size="20" fill="${palette.cream}">A self-initiated concept by Anthony Volatile / Volatile Solutions</text></g><g opacity=".17">${symbol(900, 180, 250, palette.peach)}</g></svg>`;
await writeFile('public/brand/og.svg', og);
await sharp(Buffer.from(og)).png().toFile('public/brand/og.png');
for (const c of campaigns) {
  for (const [width, height] of [
    [1080, 1080],
    [1080, 1350],
    [1080, 1920],
  ]) {
    const svg = creative(c, width, height);
    const path = `public/campaign/social/${c.slug}-${width}x${height}`;
    await writeFile(`${path}.svg`, svg);
    await sharp(Buffer.from(svg)).png().toFile(`${path}.png`);
  }
}
for (const c of campaigns.slice(0, 3)) {
  const svg = creative(c, 1200, 1800);
  await writeFile(`public/campaign/posters/${c.slug}-1200x1800.svg`, svg);
  await sharp(Buffer.from(svg)).png().toFile(`public/campaign/posters/${c.slug}-1200x1800.png`);
}
for (const [width, height] of [
  [300, 250],
  [728, 90],
  [160, 600],
  [970, 250],
]) {
  const wide = width / height > 3;
  const color = palette.cream;
  const text = wide
    ? ['One less errand. More of your day.']
    : width === 160
      ? ['A familiar', 'place. A', 'helpful', 'conversation.']
      : ['One less errand.', 'More of your day.'];
  const font = wide ? Math.min(height * 0.25, width * 0.032) : width * 0.1;
  const top = wide ? height * 0.46 : height * 0.3;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="${width}" height="${height}" fill="${palette.forest}"/><g font-family="Arial,sans-serif">${wide ? `<text x="18" y="${height * 0.58}" font-size="${height * 0.16}" fill="${color}" font-weight="600">alder &amp; row</text>` : logo(18, 20, width * 0.1, color)}${text.map((t, i) => `<text x="${wide ? width * 0.24 : 18}" y="${top + i * font * 1.2}" font-size="${font}" font-weight="600" letter-spacing="-${font * 0.04}" fill="${color}">${escape(t)}</text>`).join('')}<rect x="${wide ? width * 0.8 : 18}" y="${wide ? height * 0.34 : height - 54}" width="${wide ? width * 0.17 : width - 36}" height="${wide ? height * 0.34 : 28}" rx="3" fill="${palette.peach}"/><text x="${wide ? width * 0.82 : 27}" y="${wide ? height * 0.56 : height - 35}" font-size="${wide ? Math.min(12, height * 0.12) : width * 0.034}" fill="${palette.forest}" font-weight="600">${wide ? 'Find your place' : 'Explore the concept'} ↗</text><text x="18" y="${height - 8}" font-size="${wide ? 5 : 6}" fill="${color}">PORTFOLIO CONCEPT</text></g></svg>`;
  await writeFile(`public/campaign/display/neighborhood-${width}x${height}.svg`, svg);
  await sharp(Buffer.from(svg))
    .png()
    .toFile(`public/campaign/display/neighborhood-${width}x${height}.png`);
}
const emails = emailRecords.map((email) => ({ ...email, color: palette[email.color] }));
for (const e of emails) {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${escape(e.subject)} | Alder &amp; Row email concept</title><style>body{margin:0;background:#eeeae0;color:#183e35;font-family:Arial,sans-serif}a:focus-visible{outline:3px solid #a46b29;outline-offset:4px}@media(max-width:620px){.outer{width:100%!important}.pad{padding:28px 24px!important}h1{font-size:34px!important}}</style></head><body><div style="display:none;max-height:0;overflow:hidden">${escape(e.subject)} Portfolio concept. No real services.</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:30px 12px"><table role="presentation" class="outer" width="600" cellpadding="0" cellspacing="0" style="background:#faf9f5;max-width:600px;width:100%"><tr><td class="pad" style="padding:32px 42px;border-bottom:1px solid #dedfd6"><p style="font-size:29px;font-weight:600;letter-spacing:-1.5px;margin:0">alder &amp; row</p><p style="font-size:8px;letter-spacing:1.3px;margin:8px 0 0">PHARMACY &amp; EVERYDAY CARE</p></td></tr><tr><td class="pad" style="background:${e.color};padding:48px 42px"><p style="font-size:10px;letter-spacing:1.5px;font-weight:600">${escape(e.eyebrow)}</p><h1 style="font-size:44px;line-height:1.12;letter-spacing:-2px;font-weight:600;margin:22px 0">${escape(e.title)}</h1></td></tr><tr><td class="pad" style="padding:35px 42px"><p style="font-size:16px;line-height:1.8;color:#5d6c64;margin:0 0 28px">${escape(e.copy)}</p><table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:#183e35;border-radius:5px"><a href="${e.href}" style="display:inline-block;padding:16px 24px;color:#faf9f5;font-weight:600;font-size:14px;text-decoration:none">${escape(e.cta)} →</a></td></tr></table><p style="font-size:12px;line-height:1.8;color:#5d6c64;margin-top:28px">This is a fictional portfolio email concept. No real prescription, appointment, service, or message delivery is represented.</p></td></tr><tr><td class="pad" style="padding:25px 42px;border-top:1px solid #dedfd6;font-size:11px;line-height:1.8;color:#5d6c64">Alder &amp; Row · A Volatile Solutions concept<br><a href="/member/profile/" style="color:#183e35">View demo communication preferences</a><br>Created by Anthony Volatile. This template has not been sent.</td></tr></table></td></tr></table></body></html>`;
  await writeFile(`public/campaign/email/${e.slug}.html`, html);
}
console.log(
  'Created 18 social SVG + PNG layouts, 4 display SVG + PNG layouts, 3 poster SVG + PNG concepts, 3 email HTML templates, and brand assets.',
);
