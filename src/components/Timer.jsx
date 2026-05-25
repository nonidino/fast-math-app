export default function Timer({ seconds }) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  const display = m > 0 ? `${m}:${String(s).padStart(2, '0')}` : `${s}s`;
  return <div className="timer">&#9201; {display}</div>;
}
