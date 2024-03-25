import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import './task.css';

function Task({ label, onDeleted, onToggleDone, done, timeCreated }) {
  const taskTimer = formatDistanceToNow(timeCreated, {
    includeSeconds: true,
    addSuffix: true,
  });

  let classNames = 'view';
  if (done) {
    classNames += ' completed';
  }
  let idxq = 1;
  return (
    <div className={classNames}>
      <input
        id={idxq++}
        className="toggle"
        type="checkbox"
        defaultChecked={done ? 1 : 0}
        onClick={onToggleDone}
      />
      <label htmlFor={idxq}>
        <span className="description">{label}</span>
        <span className="created">{taskTimer}</span>
      </label>
      <button type="button" className="icon icon-edit" aria-label="Edit" />
      <button
        type="button"
        className="icon icon-destroy"
        onClick={onDeleted}
        aria-label="destroy"
      />
    </div>
  );
}

Task.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
  done: false,
  timeCreated: 0,
  label: '',
};
Task.propsTypes = {
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  done: PropTypes.bool,
  timeCreated: PropTypes.number,
  label: PropTypes.string,
};

export default Task;
