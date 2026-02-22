import React from 'react';
import '../styles/TaskItem.css';

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const priorityLabels = { low: '🟢 Low', medium: '🟡 Medium', high: '🔴 High' };

  function formatDate(d) {
    const date = new Date(d);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function handleDelete() {
    if (window.confirm('Delete this task?')) {
      onDelete(task.id);
    }
  }

  return (
    <div className={`task-card priority-${task.priority} ${task.completed ? 'completed' : ''}`}>
      <div className="task-card-header">
        <span className={`priority-badge ${task.priority}`}>{priorityLabels[task.priority]}</span>
        {task.completed && <span className="done-badge">Done</span>}
      </div>
      <h3 className="task-title">{task.title}</h3>
      {task.description && <p className="task-desc">{task.description}</p>}
      <p className="task-date">Created: {formatDate(task.createdAt)}</p>
      <div className="task-actions">
        <button className={`btn-toggle ${task.completed ? 'undo' : ''}`} onClick={() => onToggle(task.id)}>
          {task.completed ? 'Undo' : '✓ Complete'}
        </button>
        <button className="btn-edit" onClick={() => onEdit(task)}>Edit</button>
        <button className="btn-delete" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;
