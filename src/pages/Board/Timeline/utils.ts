import { MONTHS_PER_YEAR } from './constants';

// We Set our colors here
const COLORS = ['FF005D', '0085B6', '0BB4C1', '00D49D', 'FEDF03', '233D4D', 'FE7F2D', 'FCCA46', 'A1C181', '579C87'];

// Don't change this function, Setting the colors
export const randomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];
let color = -1;
export const nextColor = () => {
  color = (color + 1) % COLORS.length;
  return COLORS[color];
};
export const hexToRgb = (hex: any) => {
  const v = parseInt(hex, 16);
  const r = (v >> 16) & 255;
  const g = (v >> 8) & 255;
  const b = v & 255;
  return [r, g, b];
};
export const colourIsLight = (r: any, g: any, b: any) => {
  const a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return a < 0.5;
};

// Creating the Array for chart
export const fill = (n: any) => {
  const arr = [];
  for (let i = 0; i < n; i += 1) {
    arr.push(i);
  }
  return arr;
};

// Adding Dates
export const addMonthsToYear = (year: any, monthsToAdd: any) => {
  let y = year;
  let m = monthsToAdd;
  while (m >= MONTHS_PER_YEAR) {
    m -= MONTHS_PER_YEAR;
    y += 1;
  }
  return { year: y, month: m + 1 };
};
export const addMonthsToYearAsDate = (year: any, monthsToAdd: any) => {
  const r = addMonthsToYear(year, monthsToAdd);
  return new Date(`${r.year}-${r.month}`);
};
