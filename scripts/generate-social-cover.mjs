import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const inputPath = path.join(root, 'public/images/hero-memoji.png');
const outputPath = path.join(root, 'public/images/social-cover.png');

const background = Buffer.from(`
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="base" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#111213"/>
        <stop offset="1" stop-color="#202224"/>
      </linearGradient>
      <radialGradient id="glow" cx="78%" cy="40%" r="48%">
        <stop stop-color="#4a4d50" stop-opacity=".9"/>
        <stop offset="1" stop-color="#202224" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#base)"/>
    <rect width="1200" height="630" fill="url(#glow)"/>
    <circle cx="88" cy="88" r="7" fill="#deded9"/>
    <text x="112" y="96" fill="#c7c7c3" font-family="Arial,sans-serif" font-size="21" letter-spacing="5">JOSHUA ANSAH · PORTFOLIO</text>
    <text x="82" y="300" fill="#f8f8f7" font-family="Arial,sans-serif" font-size="68" font-weight="700" letter-spacing="-2">Software Engineer</text>
    <text x="86" y="360" fill="#c5c6c3" font-family="Arial,sans-serif" font-size="27">Web, mobile, APIs &amp; product solutions</text>
    <g font-family="Arial,sans-serif" font-size="17" fill="#e0e0dc">
      <rect x="84" y="493" width="97" height="42" rx="21" fill="#292b2d" stroke="#656769"/>
      <text x="106" y="520">React</text>
      <rect x="193" y="493" width="144" height="42" rx="21" fill="#292b2d" stroke="#656769"/>
      <text x="212" y="520">TypeScript</text>
      <rect x="349" y="493" width="118" height="42" rx="21" fill="#292b2d" stroke="#656769"/>
      <text x="370" y="520">Node.js</text>
      <rect x="479" y="493" width="99" height="42" rx="21" fill="#292b2d" stroke="#656769"/>
      <text x="500" y="520">Flutter</text>
    </g>
  </svg>
`);

const memoji = await readFile(inputPath);
await mkdir(path.dirname(outputPath), { recursive: true });

await sharp(background)
  .composite([
    {
      input: await sharp(memoji)
        .resize(610, 610, { fit: 'contain' })
        .png()
        .toBuffer(),
      left: 608,
      top: 20
    }
  ])
  .png({ compressionLevel: 9 })
  .toFile(outputPath);

console.log(`Generated ${path.relative(root, outputPath)}`);
