/**
 * Writes public/team/faces/01.jpg … 14.jpg in executive-board order (members.js).
 *
 * Sources (first match wins):
 *   1) public/team/executive-cutout-3443.png — 3+4+4+3 sheet; row bands on 1024px canvas;
 *      grid slot order ≠ members.js order — see CUTOUT_GRID_TO_MEMBER_ID in this file.
 *   2) public/team/exec-board-poster.png — locker poster layout (755×1024)
 *   3) public/team/portraits-collage.jpg — legacy sheet
 *
 * Re-run: npm run extract:team-faces
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const outDir = path.join(root, 'public', 'team', 'faces');

const CUTOUT_PATH = path.join(root, 'public', 'team', 'executive-cutout-3443.png');
const POSTER_CANDIDATES = [
  path.join(root, 'public', 'team', 'exec-board-poster.png'),
  path.join(root, 'public', 'team', 'exec-board-poster.jpg'),
  path.join(root, 'public', 'team', 'portraits-collage.jpg'),
];

const FACE_HEIGHT_FRAC = 0.68;
/** Square output; larger = sharper in UI circles */
const OUT_SIZE = 448;
/** After trim, keep top fraction of height (head & shoulders; drops lower torso on waist-up cutouts) */
const CUTOUT_UPPER_BODY_FRAC = 0.78;
/** Inset inside each grid cell (fraction of cell width/height) — trims sheet gutters */
const CUTOUT_PAD_FRAC = 0.035;

/** Locker poster: 755×1024 */
const POSTER_REF_W = 755;
const POSTER_REF_H = 1024;
const POSTER_BOXES = [
  { id: 1, x: 160, y: 50, w: 300, h: 200 },
  { id: 2, x: 455, y: 60, w: 260, h: 190 },
  { id: 3, x: 210, y: 248, w: 230, h: 175 },
  { id: 4, x: 258, y: 248, w: 240, h: 175 },
  { id: 5, x: 508, y: 248, w: 242, h: 175 },
  { id: 6, x: 210, y: 455, w: 230, h: 158 },
  { id: 7, x: 258, y: 455, w: 240, h: 158 },
  { id: 8, x: 508, y: 455, w: 242, h: 158 },
  { id: 9, x: 210, y: 575, w: 230, h: 165 },
  { id: 10, x: 258, y: 575, w: 240, h: 165 },
  { id: 11, x: 508, y: 575, w: 242, h: 165 },
  { id: 12, x: 210, y: 735, w: 230, h: 265 },
  { id: 13, x: 258, y: 735, w: 240, h: 265 },
  { id: 14, x: 508, y: 735, w: 242, h: 265 },
];

const ROWS_3443 = [3, 4, 4, 3];

/**
 * Grid slot index (row-major 3+4+4+3) → executive id in members.js (1…14).
 * The cutout sheet order differs from board list order; this maps visuals to names.
 */
const CUTOUT_GRID_TO_MEMBER_ID = [
  13, 2, 5, 4, 1, 6, 8, 7, 3, 14, 9, 10, 11, 12,
];

/** Row bands on 461×1024 reference (content rows; canvas has extra bottom margin) */
const CUTOUT_ROW_REFS = [
  { y: 22, h: 127 },
  { y: 171, h: 120 },
  { y: 304, h: 129 },
  { y: 461, h: 143 },
];

function scalePosterBoxes(W, H) {
  const sx = W / POSTER_REF_W;
  const sy = H / POSTER_REF_H;
  return POSTER_BOXES.map((b) => ({
    id: b.id,
    x: Math.max(0, Math.round(b.x * sx)),
    y: Math.max(0, Math.round(b.y * sy)),
    w: Math.min(W, Math.round(b.w * sx)),
    h: Math.min(H, Math.round(b.h * sy)),
  }));
}

const CUTOUT_REF_H = 1024;

/** Row-major cells; member id comes from CUTOUT_GRID_TO_MEMBER_ID[gridIndex]. */
function boxes3443(W, H, padFrac) {
  const sy = H / CUTOUT_REF_H;
  const boxes = [];
  let gridIndex = 0;
  for (let r = 0; r < ROWS_3443.length; r++) {
    const cols = ROWS_3443[r];
    const colW = W / cols;
    const band = CUTOUT_ROW_REFS[r];
    const rowTop = Math.max(0, Math.round(band.y * sy));
    const rowH = Math.max(32, Math.round(band.h * sy));
    const my = Math.min(rowH * 0.5, Math.max(2, rowH * padFrac));
    const mx = Math.min(colW * 0.5, Math.max(2, colW * padFrac));
    for (let c = 0; c < cols; c++) {
      const x0 = c * colW;
      const memberId = CUTOUT_GRID_TO_MEMBER_ID[gridIndex];
      boxes.push({
        id: memberId,
        gridIndex: gridIndex++,
        x: Math.max(0, Math.floor(x0 + mx)),
        y: Math.max(0, Math.floor(rowTop + my)),
        w: Math.max(32, Math.floor(colW - 2 * mx)),
        h: Math.max(32, Math.floor(rowH - 2 * my)),
      });
    }
  }
  return boxes;
}

async function writeFaceJpeg(src, box, opts) {
  const { W, H, useNorthCrop, trimCutout } = opts;
  const faceH = useNorthCrop
    ? Math.max(64, Math.floor(box.h * FACE_HEIGHT_FRAC))
    : box.h;
  const ew = Math.min(box.w, W - box.x);
  const eh = Math.min(faceH, H - box.y);
  if (ew < 32 || eh < 32) {
    console.warn('Skip bad box', box.id, box);
    return;
  }
  const dest = path.join(outDir, `${String(box.id).padStart(2, '0')}.jpg`);
  const base = () =>
    sharp(src)
      .extract({ left: box.x, top: box.y, width: ew, height: eh })
      .flatten({ background: '#ffffff' });
  let pipeline = base();
  if (trimCutout) {
    try {
      let buf = await base().png().toBuffer();
      buf = await sharp(buf).trim({ threshold: 24 }).png().toBuffer();
      const meta = await sharp(buf).metadata();
      const tw = meta.width | 0;
      const th = meta.height | 0;
      if (tw >= 32 && th >= 32) {
        let bandH = Math.floor(th * CUTOUT_UPPER_BODY_FRAC);
        bandH = Math.min(th, Math.max(32, bandH));
        if (bandH < th) {
          buf = await sharp(buf)
            .extract({ left: 0, top: 0, width: tw, height: bandH })
            .png()
            .toBuffer();
        }
      }
      pipeline = sharp(buf);
    } catch {
      pipeline = base();
    }
  }
  const resizePos = useNorthCrop ? 'north' : trimCutout ? 'attention' : 'centre';
  await pipeline
    .resize(OUT_SIZE, OUT_SIZE, {
      fit: 'cover',
      position: resizePos,
    })
    .jpeg({ quality: 93 })
    .toFile(dest);
  console.log('wrote', path.relative(root, dest));
}

async function extractCutout(src) {
  const meta = await sharp(src).metadata();
  const W = meta.width;
  const H = meta.height;
  const boxes = boxes3443(W, H, CUTOUT_PAD_FRAC);
  console.log('Source (3+4+4+3 cutout):', path.relative(root, src), `${W}×${H}`);
  for (const box of boxes) {
    await writeFaceJpeg(src, box, { W, H, useNorthCrop: false, trimCutout: true });
  }
}

async function extractPoster(src) {
  const meta = await sharp(src).metadata();
  const W = meta.width;
  const H = meta.height;
  const boxes = scalePosterBoxes(W, H);
  console.log('Source (locker poster):', path.relative(root, src), `${W}×${H}`);
  for (const box of boxes) {
    await writeFaceJpeg(src, box, { W, H, useNorthCrop: true });
  }
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  if (fs.existsSync(CUTOUT_PATH)) {
    await extractCutout(CUTOUT_PATH);
    return;
  }

  const posterSrc = POSTER_CANDIDATES.find((p) => fs.existsSync(p));
  if (!posterSrc) {
    console.error('No source image. Add public/team/executive-cutout-3443.png or a poster asset.');
    process.exit(1);
  }
  await extractPoster(posterSrc);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
