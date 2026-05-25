export default function StreakDisplay({ current, best }) {
  return (
    <div className="streak-display">
      <div className="streak-item">
        <span className="streak-label">Streak</span>
        <span className="streak-value streak-current">{current}</span>
      </div>
      <div className="streak-item">
        <span className="streak-label">Best</span>
        <span className="streak-value streak-best">{best}</span>
      </div>
    </div>
  );
}
