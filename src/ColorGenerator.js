import convert from 'color-convert';

export function findColorCode(color) {
  return convert.hex.rgb(color);
}

export function findColor(colorCode) {
  return `#${convert.rgb.hex(colorCode)}`;
}
