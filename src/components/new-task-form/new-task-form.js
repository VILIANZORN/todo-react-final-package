import React, { useState } from 'react';

import './new-task-form.css';

function NewTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'title') {
      setTitle(value);
    } else if (name === 'min' && !Number.isNaN(value) && Number.isInteger(Number(value))) {
      setMin(value);
    } else if (name === 'sec' && !Number.isNaN(value) && Number.isInteger(Number(value))) {
      setSec(value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') {
      return;
    }
    onAdd(title, min, sec);
    setTitle('');
    setMin('');
    setSec('');
  };

  return (
    <form className="header" onSubmit={onSubmit}>
      <h1>Todos</h1>
      <input
        className="new-todo"
        placeholder="Task"
        value={title}
        name="title"
        onChange={onInputChange}
        style={{ width: '50%' }}
      />
      <input
        className="new-todo"
        value={min}
        name="min"
        onChange={onInputChange}
        placeholder="Min"
        style={{ width: '25%' }}
      />
      <input
        className="new-todo"
        value={sec}
        name="sec"
        onChange={onInputChange}
        placeholder="Sec"
        style={{ width: '25%' }}
      />
      <button type="submit" style={{ display: 'none' }}>
        submit from Enter-button dont work without me
      </button>
    </form>
  );
}

export default NewTaskForm;
