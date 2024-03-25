import React from 'react';
import PropTypes from 'prop-types';

import './tasks-filter.css';

function TasksFilter({ filter, onFilterChange }) {
  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          className={filter === 'all' ? 'selected' : ''}
          onClick={() => onFilterChange('all')}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filter === 'active' ? 'selected' : ''}
          onClick={() => onFilterChange('active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filter === 'completed' ? 'selected' : ''}
          onClick={() => onFilterChange('completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

TasksFilter.defaultProps = {
  filter: 'all',
  onFilterChange: () => {},
};

TasksFilter.propsTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
};

export default TasksFilter;
