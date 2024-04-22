import React, { useState, useEffect, useRef, useCallback } from 'react';
import { formatDistanceToNow } from 'date-fns';

import './task.css';

function Task({
  title,
  onDelete,
  onCompleted,
  completed,
  timeCreated,
  startTimer,
  stopTimer,
  remainingTime,
  id,
  onEditTitle,
  editingTaskId,
  setEditingTaskId,
}) {
  const [editedTitle, setEditedTitle] = useState(title);
  const inputRef = useRef(null);
  const taskTimer = formatDistanceToNow(new Date(timeCreated), {
    includeSeconds: true,
    addSuffix: true,
  });
  const completeClasss = completed ? 'completed' : '';
  const remainingMinutes = Math.floor(remainingTime / 60);
  const remainingSeconds = remainingTime % 60;

  useEffect(() => {
    if (editingTaskId) {
      inputRef.current.focus();
    }
  }, [editingTaskId]);

  const handleEdit = useCallback(() => {
    setEditingTaskId(true);
    setEditedTitle(title);
  }, [title, setEditingTaskId]);

  const handleChange = useCallback((e) => {
    setEditedTitle(e.target.value);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingTaskId(false);
  }, [setEditingTaskId]);

  const handleSave = useCallback(() => {
    if (!editedTitle) {
      handleCancelEdit();
      return;
    }

    onEditTitle(id, editedTitle);
    setEditingTaskId(false);
  }, [editedTitle, id, onEditTitle, handleCancelEdit, setEditingTaskId]);

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (editingTaskId) {
        if (e.key === 'Enter') {
          handleSave();
        } else if (e.key === 'Escape') {
          handleCancelEdit();
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [editingTaskId, handleSave, handleCancelEdit]);

  const trimmedTitle = title.length > 15 ? `${title.substring(0, 15)  }...` : title;
  
  return (
    <li className={completeClasss}>
      {editingTaskId ? (
        <div className="view">
          <label>
            <span className="description">
              <input
                className="new-todo"
                type="text"
                value={editedTitle}
                onChange={handleChange}
                ref={inputRef}
              />
            </span>
          </label>
        </div>
      ) : (
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={onCompleted} />
          <label>
            <span className="description">
              {trimmedTitle}
              <span className="btns">
                <button
                  type="button"
                  aria-label="Start Timer"
                  className="icon icon-play"
                  onClick={() => startTimer(id)}
                />
                <button
                  type="button"
                  aria-label="Start Timer"
                  className="icon icon-pause"
                  onClick={() => stopTimer(id)}
                />
                <span className="result-timer">
                  {remainingMinutes} min : {remainingSeconds} sec
                </span>
              </span>
            </span>
            <span className="created">{taskTimer}</span>
          </label>
          <button
            type="button"
            aria-label="Start Timer"
            className="icon icon-edit"
            onClick={handleEdit}
          />
          <button
            type="button"
            aria-label="Delete Timer"
            className="icon icon-destroy"
            onClick={onDelete}
          />
        </div>
      )}
    </li>
  );
}

export default Task;


