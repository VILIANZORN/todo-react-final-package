import React from 'react';
import PropTypes from 'prop-types';

import './footer.css';
import TasksFilter from '../tasks-filter';

function Footer({ todoCount, onClearComp, onFilterChange, filter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={onClearComp}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  todoCount: 0,
  onClearComp: () => {},
  onFilterChange: () => {},
  filter: 'all',
};
Footer.propTypes = {
  todoCount: PropTypes.number,
  onClearComp: PropTypes.func,
  onFilterChange: PropTypes.func,
  filter: PropTypes.string,
};

export default Footer;
