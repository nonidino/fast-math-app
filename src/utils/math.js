export function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}

const SIEVE_MAX = 300;
const _sieve = new Array(SIEVE_MAX + 1).fill(true);
_sieve[0] = _sieve[1] = false;
for (let i = 2; i * i <= SIEVE_MAX; i++) {
  if (_sieve[i]) for (let j = i * i; j <= SIEVE_MAX; j += i) _sieve[j] = false;
}
export const isPrime = (n) => Number.isInteger(n) && n >= 2 && n <= SIEVE_MAX && _sieve[n];

export function factorCount(n) {
  if (n <= 0) return 0;
  let count = 0;
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) count += i === n / i ? 1 : 2;
  }
  return count;
}

export const FACTORIALS = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800];

export function canonicalFractionStr(num, den) {
  if (den === 0 || num === 0) return '0';
  if (den < 0) { num = -num; den = -den; }
  const g = gcd(Math.abs(num), den);
  const n = num / g, d = den / g;
  return d === 1 ? String(n) : `${n}/${d}`;
}

export function normalizeAnswer(str) {
  if (!str) return null;
  str = str.trim();
  if (str.includes('/')) {
    const parts = str.split('/');
    if (parts.length !== 2) return null;
    const num = parseInt(parts[0].trim(), 10);
    const den = parseInt(parts[1].trim(), 10);
    if (isNaN(num) || isNaN(den) || den === 0) return null;
    return canonicalFractionStr(num, den);
  }
  const n = parseInt(str, 10);
  return isNaN(n) ? null : String(n);
}
