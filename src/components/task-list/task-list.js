import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';

import './task-list.css';

function TaskList({ todos, onDeleted, onToggleDone }) {
  const elements = todos.map((item) => {
    const { id, label, ...itemProps } = item;
    return (
      <li key={id}>
        <Task
          label={label}
          {...itemProps} // Проверить
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => {
            onToggleDone(id);
          }}
        />
      </li>
    );
  });
  return <ul className="todo-list">{elements}</ul>;
}
TaskList.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
};
TaskList.propTypes = {
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
};
export default TaskList;
