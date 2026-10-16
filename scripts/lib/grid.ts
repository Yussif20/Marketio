import sharp from "sharp";

/** Longest run of near-white lines in the middle third, i.e. the gutter. Falls back to the exact centre. */
function findGutter(means: number[]) {
  const from = Math.floor(means.length * 0.35);
  const to = Math.ceil(means.length * 0.65);
  let best = { start: Math.floor(means.length / 2), end: Math.floor(means.length / 2) };
  let start = -1;
  for (let i = from; i <= to; i++) {
    const white = i < to && means[i] > 247;
    if (white && start < 0) start = i;
    if (!white && start >= 0) {
      if (i - start > best.end - best.start) best = { start, end: i };
      start = -1;
    }
  }
  return best;
}

export interface Tile {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * Finds the white gutters of a 2×2 grid image and returns the four tiles in
 * reading order (top-left, top-right, bottom-left, bottom-right), inset a few
 * pixels so no gutter line survives a crop.
 */
export async function gridTiles(file: string, inset = 6): Promise<Tile[]> {
  const image = sharp(file);
  const { width, height } = await image.metadata();
  if (!width || !height) throw new Error(`${file}: unreadable image`);

  const { data } = await image.greyscale().raw().toBuffer({ resolveWithObject: true });
  const columnMeans = Array.from({ length: width }, (_, x) => {
    let sum = 0;
    for (let y = 0; y < height; y++) sum += data[y * width + x];
    return sum / height;
  });
  const rowMeans = Array.from({ length: height }, (_, y) => {
    let sum = 0;
    for (let x = 0; x < width; x++) sum += data[y * width + x];
    return sum / width;
  });
  const col = findGutter(columnMeans);
  const row = findGutter(rowMeans);

  return [
    { left: 0, top: 0, right: col.start, bottom: row.start },
    { left: col.end, top: 0, right: width, bottom: row.start },
    { left: 0, top: row.end, right: col.start, bottom: height },
    { left: col.end, top: row.end, right: width, bottom: height },
  ].map(({ left, top, right, bottom }) => ({
    left: left + inset,
    top: top + inset,
    width: right - left - inset * 2,
    height: bottom - top - inset * 2,
  }));
}

/** Largest centred crop of `tile` with the given aspect ratio (width / height). */
export function centredCrop(tile: Tile, aspect: number): Tile {
  const width = Math.min(tile.width, Math.round(tile.height * aspect));
  const height = Math.round(width / aspect);
  return {
    left: tile.left + Math.floor((tile.width - width) / 2),
    top: tile.top + Math.floor((tile.height - height) / 2),
    width,
    height,
  };
}
