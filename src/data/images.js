/**
 * Which derivatives actually exist on disk, so srcset never points at a
 * missing file. Regenerate with scripts/images.mjs after adding photography.
 */
export const images = {
  "collection-nails": { widths: [640], full: true, fullWidth: 1000, w: 1000, h: 1200 },
  // Still the only stock photograph left. Needs a real hero at 1920 from the
  // owner; Instagram's grid caps at 512 and would visibly soften full bleed.
  "hero": { widths: [640, 1280], full: true, fullWidth: 1920, w: 1920, h: 1088 },
  // The six below are Head & Co.'s own photographs, taken from their Instagram
  // grid, which serves 512x640. No -640 derivative: upscaling a 512px source
  // would add bytes without adding detail.
  "philosophy": { widths: [], full: true, fullWidth: 512, w: 512, h: 640 },
  "ritual-hands": { widths: [], full: true, fullWidth: 512, w: 512, h: 640 },
  "ritual-water": { widths: [], full: true, fullWidth: 512, w: 512, h: 640 },
  "space-lanterns": { widths: [], full: true, fullWidth: 512, w: 512, h: 640 },
  "space-reception": { widths: [], full: true, fullWidth: 512, w: 512, h: 640 },
  "space-room": { widths: [], full: true, fullWidth: 512, w: 512, h: 640 },
};
