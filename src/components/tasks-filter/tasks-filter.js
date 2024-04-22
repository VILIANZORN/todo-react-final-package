import React from 'react';

function TasksFilter({ filter, onFilterSelect }) {
  const buttonsData = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Completed' },
  ];

  const buttons = buttonsData.map(({ name, label }) => {
    const active = filter === name;
    const classs = active ? 'selected' : '';
    return (
      <li key={name}>
        <button type="button" className={`btn ${classs}`} onClick={() => onFilterSelect(name)}>
          {label}
        </button>
      </li>
    );
  });

  return <ul>{buttons}</ul>;
}

export default TasksFilter;

