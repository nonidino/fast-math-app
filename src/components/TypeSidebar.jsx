import { SECTIONS } from '../utils/types.js';

export default function TypeSidebar({ selectedTypes, onToggle }) {
  const activeCount = Object.values(selectedTypes).filter(Boolean).length;

  return (
    <div className="type-sidebar-inner">
      <h2 className="sidebar-heading">Question Types</h2>
      {SECTIONS.map((section) => (
        <div key={section.title} className="ts-section">
          <h3 className="ts-section-title">{section.title}</h3>
          {section.types.map((type) => {
            const checked = !!selectedTypes[type.key];
            const isLast = checked && activeCount === 1;
            return (
              <label key={type.key} className={`ts-option${isLast ? ' ts-option-disabled' : ''}`}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(type.key)}
                  disabled={isLast}
                />
                {type.label}
              </label>
            );
          })}
        </div>
      ))}
    </div>
  );
}
