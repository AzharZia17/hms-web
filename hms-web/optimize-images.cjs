/**
 * HMS Image Optimizer — CJS version
 * Run from /mnt/D/HMS/hms-web:  node /path/to/optimize-images.cjs
 */

"use strict";

const sharp = require("sharp");
const { readdir, stat } = require("fs/promises");
const { join, extname } = require("path");

const PUBLIC = "/mnt/D/HMS/hms-web/public";

// quality: WebP lossy quality (1-100); lossless: use lossless WebP (for logos)
const CONFIGS = [
  { dir: join(PUBLIC, "images/products"), recursive: true, quality: 82, lossless: false },
  { dir: join(PUBLIC, "images/story"),    recursive: true, quality: 82, lossless: false },
  { dir: join(PUBLIC, "brand"),           recursive: true, quality: 90, lossless: true  },
];

const EXTS = new Set([".png", ".jpg", ".jpeg"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...await walk(full));
    } else if (EXTS.has(extname(e.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

async function optimizeFile(src, quality, lossless) {
  const dest = src.replace(/\.(png|jpg|jpeg)$/i, ".webp");

  // Skip if webp already exists and is newer than the source
  try {
    const [sStat, dStat] = await Promise.all([stat(src), stat(dest)]);
    if (dStat.mtimeMs >= sStat.mtimeMs) {
      return { skipped: true };
    }
  } catch {}

  const srcStat = await stat(src);

  if (lossless) {
    await sharp(src).webp({ lossless: true, effort: 6 }).toFile(dest);
  } else {
    await sharp(src)
      .webp({ quality, effort: 6, smartSubsample: true })
      .toFile(dest);
  }

  const destStat = await stat(dest);
  const saving = ((1 - destStat.size / srcStat.size) * 100).toFixed(1);
  return {
    rel: src.replace(PUBLIC, ""),
    before: Math.round(srcStat.size / 1024),
    after: Math.round(destStat.size / 1024),
    saving,
    skipped: false,
  };
}

async function main() {
  let totalBefore = 0, totalAfter = 0, converted = 0, skipped = 0;

  for (const { dir, recursive, quality, lossless } of CONFIGS) {
    const files = recursive ? await walk(dir) : [];

    console.log(`\nProcessing ${files.length} files in ${dir.replace(PUBLIC, "public/")} ...`);

    for (const f of files) {
      try {
        const r = await optimizeFile(f, quality, lossless);
        if (r.skipped) {
          skipped++;
        } else {
          totalBefore += r.before;
          totalAfter += r.after;
          converted++;
          console.log(`  ✓ ${r.rel.padEnd(72)} ${String(r.before).padStart(5)}K → ${String(r.after).padStart(5)}K  (${r.saving}%)`);
        }
      } catch (err) {
        console.error(`  ✗ ${f}: ${err.message}`);
      }
    }
  }

  console.log(`\n${"═".repeat(80)}`);
  console.log(`Converted : ${converted} files`);
  console.log(`Skipped   : ${skipped} files (already up-to-date)`);
  console.log(`Before    : ${(totalBefore / 1024).toFixed(1)} MB`);
  console.log(`After     : ${(totalAfter / 1024).toFixed(1)} MB`);
  if (totalBefore > 0) {
    console.log(`Saved     : ${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%  (${((totalBefore - totalAfter) / 1024).toFixed(1)} MB freed)`);
  }
}

main().catch(console.error);
