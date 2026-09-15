/**
 * Rasterize Vocem brand SVGs into Android launcher icons and Play listing assets.
 * Run from apps/android: node scripts/generate-brand-assets.mjs
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repo = path.resolve(root, "../..");
const res = path.join(root, "android/app/src/main/res");
const play = path.join(root, "play");
const markSvg = await readFile(path.join(repo, "public/brand/vocem-logo-square.svg"));
const ogJpg = path.join(repo, "public/og.jpg");

const densities = {
  mdpi: 1,
  hdpi: 1.5,
  xhdpi: 2,
  xxhdpi: 3,
  xxxhdpi: 4,
};

async function markPng(px) {
  return sharp(markSvg).resize(px, px, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
}

async function blackWithMark(size, markRatio = 0.72) {
  const mark = await markPng(Math.round(size * markRatio));
  return sharp({
    create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 1 } },
  })
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toBuffer();
}

async function roundMask(size, buf) {
  const r = size / 2;
  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="${r}" cy="${r}" r="${r}" fill="white"/></svg>`;
  return sharp(buf)
    .composite([{ input: Buffer.from(svg), blend: "dest-in" }])
    .png()
    .toBuffer();
}

await mkdir(play, { recursive: true });

for (const [name, scale] of Object.entries(densities)) {
  const dir = path.join(res, `mipmap-${name}`);
  await mkdir(dir, { recursive: true });
  const launcher = Math.round(48 * scale);
  const foreground = Math.round(108 * scale);
  const square = await blackWithMark(launcher, 0.7);
  await writeFile(path.join(dir, "ic_launcher.png"), square);
  await writeFile(path.join(dir, "ic_launcher_round.png"), await roundMask(launcher, square));
  const fgMark = await markPng(Math.round(foreground * 0.62));
  const fg = await sharp({
    create: { width: foreground, height: foreground, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: fgMark, gravity: "center" }])
    .png()
    .toBuffer();
  await writeFile(path.join(dir, "ic_launcher_foreground.png"), fg);
}

const playIcon = await blackWithMark(512, 0.75);
await writeFile(path.join(play, "icon-512.png"), playIcon);

await sharp(ogJpg)
  .resize(1024, 500, { fit: "cover", position: "centre" })
  .removeAlpha()
  .jpeg({ quality: 92 })
  .toFile(path.join(play, "feature-graphic-1024x500.jpg"));

const splashPort = await sharp({
  create: { width: 1080, height: 1920, channels: 3, background: "#000000" },
})
  .composite([{ input: await markPng(420), gravity: "center" }])
  .png()
  .toBuffer();
const splashLand = await sharp({
  create: { width: 1920, height: 1080, channels: 3, background: "#000000" },
})
  .composite([{ input: await markPng(360), gravity: "center" }])
  .png()
  .toBuffer();
const splashSquare = await sharp({
  create: { width: 1080, height: 1080, channels: 3, background: "#000000" },
})
  .composite([{ input: await markPng(400), gravity: "center" }])
  .png()
  .toBuffer();

await writeFile(path.join(res, "drawable/splash.png"), splashSquare);
for (const [name, scale] of Object.entries(densities)) {
  const portDir = path.join(res, `drawable-port-${name}`);
  const landDir = path.join(res, `drawable-land-${name}`);
  await mkdir(portDir, { recursive: true });
  await mkdir(landDir, { recursive: true });
  const pw = Math.round(320 * scale);
  const ph = Math.round(480 * scale);
  const lw = Math.round(480 * scale);
  const lh = Math.round(320 * scale);
  await sharp(splashPort).resize(pw, ph, { fit: "cover" }).png().toFile(path.join(portDir, "splash.png"));
  await sharp(splashLand).resize(lw, lh, { fit: "cover" }).png().toFile(path.join(landDir, "splash.png"));
}

console.log("Wrote Vocem launcher icons, splashes, and Play listing graphics.");
