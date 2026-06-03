import { isPrime, factorCount, FACTORIALS, canonicalFractionStr, gcd } from './math.js';

let _qid = 0;
const id = () => ++_qid;

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function arith(a, b, op, typeKey) {
  const sym = op === '-' ? '−' : op === '*' ? '×' : '+';
  const ans = op === '+' ? a + b : op === '-' ? a - b : a * b;
  return { id: id(), typeKey, display: `${a} ${sym} ${b} = ?`, answer: String(ans), answerType: 'number' };
}

function squareQ(min, max, typeKey) {
  const n = randInt(min, max);
  return { id: id(), typeKey, display: `${n}² = ?`, answer: String(n * n), answerType: 'number' };
}

function cubeQ(min, max, typeKey) {
  const n = randInt(min, max);
  return { id: id(), typeKey, display: `${n}³ = ?`, answer: String(n * n * n), answerType: 'number' };
}

function factorialQ(min, max, typeKey) {
  const n = randInt(min, max);
  return { id: id(), typeKey, display: `${n}! = ?`, answer: String(FACTORIALS[n]), answerType: 'number' };
}

function primeQ(min, max, typeKey) {
  const n = randInt(min, max);
  return { id: id(), typeKey, display: `Is ${n} prime?`, answer: isPrime(n) ? 'yes' : 'no', answerType: 'yn' };
}

function divQ(minD, maxD, typeKey) {
  const divisor = randInt(minD, maxD);
  const n = randInt(2, 300);
  return {
    id: id(), typeKey,
    display: `Is ${n} divisible by ${divisor}?`,
    answer: n % divisor === 0 ? 'yes' : 'no',
    answerType: 'yn',
  };
}

function factorsQ(min, max, typeKey) {
  const n = randInt(min, max);
  return { id: id(), typeKey, display: `How many factors does ${n} have?`, answer: String(factorCount(n)), answerType: 'number' };
}

function fracSameQ(typeKey) {
  const d = randInt(2, 9);
  const a = randInt(1, 9);
  const b = randInt(1, 9);
  const op = Math.random() < 0.5 ? '+' : '−';
  const rawNum = op === '+' ? a + b : a - b;
  const answer = canonicalFractionStr(rawNum, d);
  return { id: id(), typeKey, display: `${a}/${d} ${op} ${b}/${d} = ?`, answer, answerType: 'fraction' };
}

function fracDiffQ(typeKey) {
  let b, d;
  do { b = randInt(2, 9); d = randInt(2, 9); } while (b === d);
  const a = randInt(1, 9);
  const c = randInt(1, 9);
  const op = Math.random() < 0.5 ? '+' : '−';
  const g = gcd(b, d);
  const lcd = (b * d) / g;
  const rawNum = op === '+' ? a * (lcd / b) + c * (lcd / d) : a * (lcd / b) - c * (lcd / d);
  const answer = canonicalFractionStr(rawNum, lcd);
  return { id: id(), typeKey, display: `${a}/${b} ${op} ${c}/${d} = ?`, answer, answerType: 'fraction' };
}

function fracMulQ(typeKey) {
  const a = randInt(1, 9), b = randInt(2, 9);
  const c = randInt(1, 9), d = randInt(2, 9);
  const answer = canonicalFractionStr(a * c, b * d);
  return { id: id(), typeKey, display: `${a}/${b} × ${c}/${d} = ?`, answer, answerType: 'fraction' };
}

function fracDivQ(typeKey) {
  const a = randInt(1, 9), b = randInt(2, 9);
  const c = randInt(1, 9), d = randInt(2, 9);
  const answer = canonicalFractionStr(a * d, b * c);
  return { id: id(), typeKey, display: `${a}/${b} ÷ ${c}/${d} = ?`, answer, answerType: 'fraction' };
}

export function generateQuestion(typeKey) {
  switch (typeKey) {
    case 'ADD_1x1': return arith(randInt(1,9),   randInt(1,9),   '+', typeKey);
    case 'ADD_1x2': return arith(randInt(1,9),   randInt(10,99), '+', typeKey);
    case 'ADD_2x2': return arith(randInt(10,99), randInt(10,99), '+', typeKey);
    case 'ADD_2x3': return arith(randInt(10,99), randInt(100,999), '+', typeKey);
    case 'ADD_3x3': return arith(randInt(100,999), randInt(100,999), '+', typeKey);

    case 'SUB_1x1': return arith(randInt(1,9),   randInt(1,9),   '-', typeKey);
    case 'SUB_1x2': return arith(randInt(1,9),   randInt(10,99), '-', typeKey);
    case 'SUB_2x2': return arith(randInt(10,99), randInt(10,99), '-', typeKey);
    case 'SUB_2x3': return arith(randInt(10,99), randInt(100,999), '-', typeKey);
    case 'SUB_3x3': return arith(randInt(100,999), randInt(100,999), '-', typeKey);

    case 'MUL_1x1': return arith(randInt(1,9),   randInt(1,9),   '*', typeKey);
    case 'MUL_1x2': return arith(randInt(1,9),   randInt(10,99), '*', typeKey);
    case 'MUL_2x2': return arith(randInt(10,99), randInt(10,99), '*', typeKey);
    case 'MUL_2x3': return arith(randInt(10,99), randInt(100,999), '*', typeKey);

    case 'MUL9_1d':  return arith(randInt(1,9),     9, '*', typeKey);
    case 'MUL9_2d':  return arith(randInt(10,99),   9, '*', typeKey);
    case 'MUL9_3d':  return arith(randInt(100,999), 9, '*', typeKey);

    case 'MUL11_1d':  return arith(randInt(1,9),     11, '*', typeKey);
    case 'MUL11_2d':  return arith(randInt(10,99),   11, '*', typeKey);
    case 'MUL11_3d':  return arith(randInt(100,999), 11, '*', typeKey);

    case 'SQ_1_10':  return squareQ(1,  10,  typeKey);
    case 'SQ_10_20': return squareQ(10, 20,  typeKey);
    case 'SQ_20_30': return squareQ(20, 30,  typeKey);
    case 'SQ_30_40': return squareQ(30, 40,  typeKey);
    case 'SQ_40_50': return squareQ(40, 50,  typeKey);

    case 'CU_1_10':  return cubeQ(1,  10,  typeKey);
    case 'CU_10_20': return cubeQ(10, 20,  typeKey);

    case 'FACT_1_10': return factorialQ(1, 10, typeKey);

    case 'PRIME_1_50':    return primeQ(1,   50,  typeKey);
    case 'PRIME_50_100':  return primeQ(50,  100, typeKey);
    case 'PRIME_100_150': return primeQ(100, 150, typeKey);
    case 'PRIME_150_200': return primeQ(150, 200, typeKey);
    case 'PRIME_200_250': return primeQ(200, 250, typeKey);
    case 'PRIME_250_300': return primeQ(250, 300, typeKey);

    case 'DIV_1_6':  return divQ(1, 6,  typeKey);
    case 'DIV_7_12': return divQ(7, 12, typeKey);

    case 'FACTORS_1_50':    return factorsQ(1,   50,  typeKey);
    case 'FACTORS_50_100':  return factorsQ(50,  100, typeKey);
    case 'FACTORS_100_150': return factorsQ(100, 150, typeKey);
    case 'FACTORS_150_200': return factorsQ(150, 200, typeKey);
    case 'FACTORS_200_250': return factorsQ(200, 250, typeKey);
    case 'FACTORS_250_300': return factorsQ(250, 300, typeKey);

    case 'FRAC_SAME': return fracSameQ(typeKey);
    case 'FRAC_DIFF': return fracDiffQ(typeKey);
    case 'FRAC_MUL':  return fracMulQ(typeKey);
    case 'FRAC_DIV':  return fracDivQ(typeKey);

    default: throw new Error(`Unknown typeKey: ${typeKey}`);
  }
}
