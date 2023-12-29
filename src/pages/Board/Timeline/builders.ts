import { MONTH_NAMES, MONTHS_PER_QUARTER, MONTHS_PER_YEAR, QUARTERS_PER_YEAR, START_YEAR } from './constants';
import { addMonthsToYear, addMonthsToYearAsDate } from './utils';

// For Creating TimeBars

export const buildQuarterCells = () => {
  // No change

  const v = [];
  for (let i = 0; i < QUARTERS_PER_YEAR * 4; i += 1) {
    const quarter = (i % 4) + 1;
    const startMonth = i * MONTHS_PER_QUARTER;
    const s = addMonthsToYear(START_YEAR, startMonth);
    const e = addMonthsToYear(START_YEAR, startMonth + MONTHS_PER_QUARTER);
    v.push({
      id: `${s.year}-q${quarter}`,
      title: `Q${quarter} ${s.year}`,
      start: new Date(`${s.year}-${s.month}-01`),
      end: new Date(`${e.year}-${e.month}-01`),
    });
  }
  return v;
};

export const buildMonthCells = () => {
  // No change
  const v = [];
  for (let i = 0; i < MONTHS_PER_YEAR * 4; i += 1) {
    const startMonth = i;
    const start = addMonthsToYearAsDate(START_YEAR, startMonth);
    const end = addMonthsToYearAsDate(START_YEAR, startMonth + 1);
    v.push({
      id: `m${startMonth}`,
      title: MONTH_NAMES[i % 12],
      start,
      end,
    });
  }
  return v;
};

export const buildTimebar = () => [
  // No change
  {
    id: 'quarters',
    title: 'Quarters',
    cells: buildQuarterCells(),
    style: {},
  },
  {
    id: 'months',
    title: 'Months',
    cells: buildMonthCells(),
    useAsGrid: true,
    style: {},
  },
];
