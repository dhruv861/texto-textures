#!/usr/bin/env node
// Re-encodes the raw source clips in media-src/ into web-optimized files in public/media/,
// plus a poster JPEG per clip for instant paint before the video itself has loaded.
//
// Usage: node scripts/optimize-media.mjs [--ffmpeg /path/to/ffmpeg]

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const srcDir = path.join(root, "media-src");
const outDir = path.join(root, "public", "media");

// Clips whose first N seconds are an unwanted intro (matches the original
// data-skip-start hack) — we cut them for real here instead of shipping the
// bytes just to skip them client-side.
const TRIM_START = {
  "garba-wall": 3.5,
  "milestone-20k": 2,
};

const ffmpegArgIdx = process.argv.indexOf("--ffmpeg");
const FFMPEG =
  (ffmpegArgIdx !== -1 && process.argv[ffmpegArgIdx + 1]) ||
  process.env.FFMPEG_PATH ||
  "ffmpeg";

function run(args) {
  const result = spawnSync(FFMPEG, args, { stdio: ["ignore", "pipe", "pipe"] });
  if (result.status !== 0) {
    console.error(result.stderr?.toString());
    throw new Error(`ffmpeg failed (exit ${result.status}): ${args.join(" ")}`);
  }
}

function fmtBytes(n) {
  return `${(n / 1024 / 1024).toFixed(2)}MB`;
}

if (!existsSync(srcDir)) {
  console.error(`No media-src/ directory found at ${srcDir}`);
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });

const files = readdirSync(srcDir).filter((f) => f.toLowerCase().endsWith(".mp4"));
if (files.length === 0) {
  console.error(`No .mp4 files found in ${srcDir}`);
  process.exit(1);
}

let totalIn = 0;
let totalOut = 0;

for (const file of files) {
  const name = path.basename(file, ".mp4");
  const inPath = path.join(srcDir, file);
  const outVideo = path.join(outDir, `${name}.mp4`);
  const outPoster = path.join(outDir, `${name}.jpg`);
  const trim = TRIM_START[name] ?? 0;

  process.stdout.write(`Encoding ${name}.mp4 ... `);

  // Video: strip audio (always played muted), re-encode at a size-efficient
  // CRF, keep native resolution (source is already a modest 720px-wide
  // vertical export), and move the moov atom to the front (+faststart) so
  // playback can start before the whole file has downloaded.
  const videoArgs = [
    "-y",
    ...(trim > 0 ? ["-ss", String(trim)] : []),
    "-i", inPath,
    "-an",
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", "28",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    outVideo,
  ];
  run(videoArgs);

  // Poster: one frame just after the trim point, used as the <video poster>
  // so the section paints instantly instead of showing a blank box.
  const posterArgs = [
    "-y",
    "-ss", String(trim + 0.15),
    "-i", inPath,
    "-frames:v", "1",
    "-q:v", "4",
    outPoster,
  ];
  run(posterArgs);

  const inSize = statSync(inPath).size;
  const outSize = statSync(outVideo).size;
  totalIn += inSize;
  totalOut += outSize;
  const delta = (((inSize - outSize) / inSize) * 100).toFixed(0);
  console.log(`${fmtBytes(inSize)} -> ${fmtBytes(outSize)} (${delta}% smaller)`);
}

console.log("---");
console.log(
  `Total: ${fmtBytes(totalIn)} -> ${fmtBytes(totalOut)} (${(
    ((totalIn - totalOut) / totalIn) *
    100
  ).toFixed(0)}% smaller)`
);
