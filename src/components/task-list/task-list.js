import React from 'react';


import Task from '../task/task';
import './task-list.css';

function TaskList({
  data,
  onDelete,
  onCompleted,
  startTimer,
  stopTimer,
  onEditTitle,
  editingTaskId,
  setEditingTaskId,
}) {
  return (
    <ul className="todo-list">
      {data.map((elem) => (
        <Task
          id={elem.id}
          key={elem.id}
          title={elem.title}
          completed={elem.completed}
          timeCreated={elem.timeCreated}
          remainingTime={elem.minNSec}
          onDelete={() => onDelete(elem.id)}
          onCompleted={() => onCompleted(elem.id)}
          startTimer={startTimer}
          stopTimer={stopTimer}
          onEditTitle={onEditTitle}
          editingTaskId={editingTaskId === elem.id}
          setEditingTaskId={(isEditing) => setEditingTaskId(isEditing ? elem.id : null)}
        />
      ))}
    </ul>
  );
}

export default TaskList;

