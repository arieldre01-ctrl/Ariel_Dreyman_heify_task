import React, { useState } from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  if (tasks.length === 0) {
    return <div className="carousel-empty"><p>No tasks here yet. Add one above!</p></div>;
  }

  function next() {
    setCurrentIdx(i => (i + 1) % tasks.length);
  }

  function prev() {
    setCurrentIdx(i => (i - 1 + tasks.length) % tasks.length);
  }

  return (
    <div className="carousel-wrapper">
      <button className="carousel-arrow left" onClick={prev}>&#8592;</button>
      <div className="carousel-viewport">
        <TaskItem task={tasks[currentIdx]} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
      </div>
      <button className="carousel-arrow right" onClick={next}>&#8594;</button>
      <p className="carousel-counter">{currentIdx + 1} / {tasks.length}</p>
    </div>
  );
}

export default TaskList;
