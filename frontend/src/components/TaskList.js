import React, { useRef, useState, useEffect } from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <div className="carousel-empty"><p>No tasks here yet. Add one above!</p></div>;
  }
  if (tasks.length === 1) {
    return <div className="carousel-single"><TaskItem task={tasks[0]} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} /></div>;
  }
  return <CarouselInner tasks={tasks} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />;
}

// split out so hooks always run regardless of early returns
function CarouselInner({ tasks, onToggle, onEdit, onDelete }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [sliding, setSliding] = useState(false);
  const timerRef = useRef(null);

  // clone first+last for seamless loop
  const cloned = [tasks[tasks.length - 1], ...tasks, tasks[0]];
  const cloneOffset = 1;
  const CARD_WIDTH = 340;
  const GAP = 24;
  const STEP = CARD_WIDTH + GAP;

  function getTranslate(idx) {
    return -(idx * STEP);
  }

  const [translateX, setTranslateX] = useState(getTranslate(cloneOffset));

  function next() {
    if (sliding) return;
    const clonedIdx = activeIdx + cloneOffset + 1;
    const nextReal = (activeIdx + 1) % tasks.length;
    setSliding(true);
    setTranslateX(getTranslate(clonedIdx));
    setTimeout(() => {
      if (nextReal === 0) setTranslateX(getTranslate(cloneOffset));
      setSliding(false);
      setActiveIdx(nextReal);
    }, 450);
  }

  function prev() {
    if (sliding) return;
    const clonedIdx = activeIdx + cloneOffset - 1;
    const prevReal = (activeIdx - 1 + tasks.length) % tasks.length;
    setSliding(true);
    setTranslateX(getTranslate(clonedIdx));
    setTimeout(() => {
      if (prevReal === tasks.length - 1) setTranslateX(getTranslate(tasks.length - 1 + cloneOffset));
      setSliding(false);
      setActiveIdx(prevReal);
    }, 450);
  }

  useEffect(() => {
    timerRef.current = setInterval(() => { next(); }, 4000);
    return () => clearInterval(timerRef.current);
  }, [activeIdx, sliding]);

  useEffect(() => {
    setActiveIdx(0);
    setTranslateX(getTranslate(cloneOffset));
  }, [tasks.length]);

  return (
    <div className="carousel-wrapper">
      <button className="carousel-arrow left" onClick={prev}>&#8592;</button>
      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: sliding ? 'transform 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
          }}
        >
          {cloned.map((task, i) => (
            <div key={`${task.id}-${i}`} className={`carousel-slide ${i === activeIdx + cloneOffset ? 'active-slide' : ''}`}>
              <TaskItem task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
            </div>
          ))}
        </div>
      </div>
      <button className="carousel-arrow right" onClick={next}>&#8594;</button>
      <div className="carousel-dots">
        {tasks.map((_, i) => (
          <span key={i} className={`dot ${i === activeIdx ? 'active' : ''}`} onClick={() => setActiveIdx(i)} />
        ))}
      </div>
      <p className="carousel-counter">{activeIdx + 1} / {tasks.length}</p>
    </div>
  );
}

export default TaskList;
