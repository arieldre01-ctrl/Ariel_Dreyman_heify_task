import React, { useState, useEffect } from 'react';
import '../styles/TaskForm.css';

function TaskForm({ onSubmit, editTask, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setPriority(editTask.priority);
    }
  }, [editTask]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required!');
      return;
    }
    setError('');
    onSubmit({ title, description, priority });
    setTitle('');
    setDescription('');
    setPriority('medium');
  }

  return (
    <div className="task-form-wrapper">
      <h2>{editTask ? 'Edit Task' : 'New Task'}</h2>
      <form onSubmit={handleSubmit} className="task-form">
        {error && <p className="form-error">{error}</p>}
        <div className="form-group">
          <label>Title *</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="What needs to be done?" />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Add some details..." rows={3} />
        </div>
        <div className="form-group">
          <label>Priority</label>
          <select value={priority} onChange={e => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary">{editTask ? 'Save Changes' : 'Add Task'}</button>
          {editTask && <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
