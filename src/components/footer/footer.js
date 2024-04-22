import React from 'react';

import TasksFilter from '../tasks-filter/tasks-filter';
import './footer.css';

function Footer({ tasksCompleted, clearList, filter, onFilterSelect }) {
  return (
    <footer className="footer">
      <span className="todo-count">{tasksCompleted} items left</span>
      <ul className="filters">
        <TasksFilter filter={filter} onFilterSelect={onFilterSelect} />
      </ul>
      <button type="button" className="clear-completed" onClick={clearList}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
