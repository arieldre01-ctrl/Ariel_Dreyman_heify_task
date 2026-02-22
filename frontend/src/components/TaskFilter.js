import React from 'react';

function TaskFilter({ current, onChange }) {
  return (
    <div>
      {['all', 'pending', 'completed'].map(f => (
        <button key={f} onClick={() => onChange(f)}>{f}</button>
      ))}
    </div>
  );
}

export default TaskFilter;
