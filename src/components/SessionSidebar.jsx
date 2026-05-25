import { SECTIONS } from '../utils/types.js';

export default function SessionSidebar({ stats, selectedTypes }) {
  const totals = Object.values(stats).reduce(
    (acc, s) => ({ correct: acc.correct + s.correct, total: acc.total + s.total }),
    { correct: 0, total: 0 }
  );

  return (
    <div className="session-sidebar-inner">
      <h2 className="sidebar-heading">Session</h2>

      {totals.total > 0 ? (
        <div className="session-total">
          <span className="session-total-correct">{totals.correct}</span>
          <span className="session-total-sep">/</span>
          <span className="session-total-attempts">{totals.total}</span>
        </div>
      ) : (
        <p className="session-empty">No answers yet</p>
      )}

      {SECTIONS.map((section) => {
        const rows = section.types.filter((t) => selectedTypes[t.key] && stats[t.key]);
        if (!rows.length) return null;
        return (
          <div key={section.title} className="ss-section">
            <h3 className="ts-section-title">{section.title}</h3>
            {rows.map((type) => {
              const s = stats[type.key];
              return (
                <div key={type.key} className="ss-row">
                  <span className="ss-label">{type.label}</span>
                  <span className="ss-score">{s.correct}/{s.total}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
