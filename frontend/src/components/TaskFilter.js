import React from 'react';

function TaskFilter({ current, onChange }) {
  const filters = ['all', 'pending', 'completed'];
  return (
    <div className="filter-bar">
      {filters.map(f => (
        <button key={f} className={`filter-btn ${current === f ? 'active' : ''}`} onClick={() => onChange(f)}>
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;
