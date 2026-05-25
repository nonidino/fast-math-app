export const SECTIONS = [
  {
    title: 'Addition',
    types: [
      { key: 'ADD_1x1', label: '1 × 1 digit' },
      { key: 'ADD_1x2', label: '1 × 2 digit' },
      { key: 'ADD_2x2', label: '2 × 2 digit' },
      { key: 'ADD_2x3', label: '2 × 3 digit' },
      { key: 'ADD_3x3', label: '3 × 3 digit' },
    ],
  },
  {
    title: 'Subtraction',
    types: [
      { key: 'SUB_1x1', label: '1 × 1 digit' },
      { key: 'SUB_1x2', label: '1 × 2 digit' },
      { key: 'SUB_2x2', label: '2 × 2 digit' },
      { key: 'SUB_2x3', label: '2 × 3 digit' },
      { key: 'SUB_3x3', label: '3 × 3 digit' },
    ],
  },
  {
    title: 'Multiplication',
    types: [
      { key: 'MUL_1x1', label: '1 × 1 digit' },
      { key: 'MUL_1x2', label: '1 × 2 digit' },
      { key: 'MUL_2x2', label: '2 × 2 digit' },
      { key: 'MUL_2x3', label: '2 × 3 digit' },
    ],
  },
  {
    title: 'Squares',
    types: [
      { key: 'SQ_1_10',  label: '1 – 10' },
      { key: 'SQ_10_20', label: '10 – 20' },
      { key: 'SQ_20_30', label: '20 – 30' },
      { key: 'SQ_30_40', label: '30 – 40' },
      { key: 'SQ_40_50', label: '40 – 50' },
    ],
  },
  {
    title: 'Cubes',
    types: [
      { key: 'CU_1_10',  label: '1 – 10' },
      { key: 'CU_10_20', label: '10 – 20' },
    ],
  },
  {
    title: 'Factorials',
    types: [
      { key: 'FACT_1_10', label: '1 – 10' },
    ],
  },
  {
    title: 'Is it prime?',
    types: [
      { key: 'PRIME_1_50',    label: '1 – 50' },
      { key: 'PRIME_50_100',  label: '50 – 100' },
      { key: 'PRIME_100_150', label: '100 – 150' },
      { key: 'PRIME_150_200', label: '150 – 200' },
      { key: 'PRIME_200_250', label: '200 – 250' },
      { key: 'PRIME_250_300', label: '250 – 300' },
    ],
  },
  {
    title: 'Divisibility',
    types: [
      { key: 'DIV_1_6',  label: 'Divisors 1 – 6' },
      { key: 'DIV_7_12', label: 'Divisors 7 – 12' },
    ],
  },
  {
    title: 'Number of Factors',
    types: [
      { key: 'FACTORS_1_50',    label: '1 – 50' },
      { key: 'FACTORS_50_100',  label: '50 – 100' },
      { key: 'FACTORS_100_150', label: '100 – 150' },
      { key: 'FACTORS_150_200', label: '150 – 200' },
      { key: 'FACTORS_200_250', label: '200 – 250' },
      { key: 'FACTORS_250_300', label: '250 – 300' },
    ],
  },
  {
    title: 'Fraction Math',
    types: [
      { key: 'FRAC_SAME', label: 'Same denom +/−' },
      { key: 'FRAC_DIFF', label: 'Diff denom +/−' },
      { key: 'FRAC_MUL',  label: 'Multiplication' },
      { key: 'FRAC_DIV',  label: 'Division' },
    ],
  },
];

export const TYPE_LABELS = {};
SECTIONS.forEach((s) => s.types.forEach((t) => { TYPE_LABELS[t.key] = t.label; }));
