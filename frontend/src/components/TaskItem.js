import React from 'react';

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={() => onToggle(task.id)}>Toggle</button>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}

export default TaskItem;
