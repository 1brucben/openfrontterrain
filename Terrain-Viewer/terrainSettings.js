export const terrainColorSchemes = {
  original(byte) {
    const IS_LAND_BIT = 1 << 7;
    const SHORELINE_BIT = 1 << 6;
    const OCEAN_BIT = 1 << 5;
    const MAGNITUDE_MASK = 0b00011111;

    const isLand = (byte & IS_LAND_BIT) !== 0;
    const isShoreline = (byte & SHORELINE_BIT) !== 0;
    const isOcean = (byte & OCEAN_BIT) !== 0;
    const magnitude = byte & MAGNITUDE_MASK;

    if (isLand && isShoreline) return { r: 204, g: 203, b: 158, a: 255 };
    if (!isLand) {
      if (isShoreline && isOcean) return { r: 100, g: 143, b: 255, a: 255 };
      const base = { r: 70, g: 132, b: 180 };
      return {
        r: Math.max(base.r - 10 + (11 - Math.min(magnitude, 10)), 0),
        g: Math.max(base.g - 10 + (11 - Math.min(magnitude, 10)), 0),
        b: Math.max(base.b - 10 + (11 - Math.min(magnitude, 10)), 0),
        a: 255,
      };
    }
    if (magnitude < 10) return { r: 190, g: 220 - 2 * magnitude, b: 138, a: 255 };
    if (magnitude < 20) {
      return {
        r: Math.min(255, 200 + 2 * magnitude),
        g: Math.min(255, 183 + 2 * magnitude),
        b: Math.min(255, 138 + 2 * magnitude),
        a: 255,
      };
    }
    const v = Math.min(255, 230 + magnitude / 2);
    return { r: v, g: v, b: v, a: 255 };
  },

  second(byte) {
    const IS_LAND_BIT = 1 << 7;
    const SHORELINE_BIT = 1 << 6;
    const OCEAN_BIT = 1 << 5;
    const MAGNITUDE_MASK = 0b00011111;

    const isLand = (byte & IS_LAND_BIT) !== 0;
    const isShoreline = (byte & SHORELINE_BIT) !== 0;
    const isOcean = (byte & OCEAN_BIT) !== 0;
    const magnitude = byte & MAGNITUDE_MASK;

    if (isLand && isShoreline) return { r: 90, g: 120, b: 170, a: 255 };
    if (!isLand) {
      if (isShoreline && isOcean) return { r: 100, g: 143, b: 255, a: 255 };
      const base = { r: 70, g: 105, b: 145 };
      return {
        r: Math.max(base.r - 10 + (11 - Math.min(magnitude, 10)), 0),
        g: Math.max(base.g - 10 + (11 - Math.min(magnitude, 10)), 0),
        b: Math.max(base.b - 10 + (11 - Math.min(magnitude, 10)), 0),
        a: 255,
      };
    }
    if (magnitude < 10) return { r: 135, g: 170 - 2 * magnitude, b: 115, a: 255 };
    if (magnitude < 20) {
      return {
        r: Math.min(255, 140 + 2 * magnitude),
        g: Math.min(255, 140 + 2 * magnitude),
        b: Math.min(255, 115 + 2 * magnitude),
        a: 255,
      };
    }
    const v = Math.min(255, 180 + magnitude / 2);
    return { r: v, g: v, b: v, a: 255 };
  },

  // You can add more here...
};
