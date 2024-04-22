import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Footer from '../footer/footer';
import NewTaskForm from '../new-task-form/new-task-form';
import TaskList from '../task-list/task-list';
import './app.css';

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingTaskId, setEditingTaskId] = useState(null);

  const addItem = (title, min, sec) => {
    const newItem = {
      title,
      min,
      sec,
      minNSec: +min * 60 + +sec,
      completed: false,
      timeCreated: new Date().toString(),
      id: uuidv4(),
      timerInterval: null,
    };
    setData((prevData) => [...prevData, newItem]);
  };

  const editTaskTitle = (taskId, newTitle) => {
    setData((prevData) => prevData.map((item) => (item.id === taskId ? { ...item, title: newTitle } : item)));
  };

  const deleteItem = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const onCompleted = (id) => {
    setData((prevData) => prevData.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)));
  };

  const clearList = () => {
    setData((prevData) => prevData.filter((item) => !item.completed));
  };

  const filterPost = (items, funcFilter) => {
    switch (funcFilter) {
      case 'done':
        return items.filter((item) => item.completed);
      case 'active':
        return items.filter((item) => !item.completed);
      case 'all':
        return items;
      default:
        return items;
    }
  };

  const onFilterSelect = (funcFilter) => {
    setFilter(funcFilter);
  };

  const stopTimer = (id) => {
    const task = data.find((item) => item.id === id);
    if (task.timerInterval && task.minNSec > 0) {
      clearInterval(task.timerInterval);
      task.timerInterval = null;
      setData((prevData) => prevData.map((item) => (item.id === id ? { ...item, timerInterval: null } : item)));
    }
  };

  const startTimer = (id) => {
    const task = data.find((item) => item.id === id);

    if (task) {
      if (task.timerInterval) {
        clearInterval(task.timerInterval);
        task.timerInterval = null;
      }

      const timeZero = task.minNSec === 0;

      setData((prevData) =>
        prevData.map((item) => {
          if (item.id === id) {
            return { ...item, minNSec: timeZero ? +item.min * 60 + +item.sec : item.minNSec };
          }
          return item;
        })
      );

      const timerInterval = setInterval(() => {
        setData((prevData) =>
          prevData.map((item) => {
            if (item.id === id && !item.completed && item.minNSec > 0) {
              return { ...item, minNSec: item.minNSec - 1 };
            }
            return item;
          })
        );
      }, 1000);
      setData((prevData) => prevData.map((item) => (item.id === id ? { ...item, timerInterval } : item)));
    }
  };

  const tasksCompleted = data.filter((item) => item.completed).length;
  const visibleData = filterPost(data, filter);

  return (
    <section className="todoapp">
      <NewTaskForm onAdd={addItem} />
      <section className="main">
        <ul className="todo-list">
          <TaskList
            data={visibleData}
            onDelete={deleteItem}
            onCompleted={onCompleted}
            startTimer={startTimer}
            stopTimer={stopTimer}
            onEditTitle={editTaskTitle}
            editingTaskId={editingTaskId}
            setEditingTaskId={setEditingTaskId}
          />
        </ul>
      </section>
      <Footer tasksCompleted={tasksCompleted} clearList={clearList} filter={filter} onFilterSelect={onFilterSelect} />
    </section>
  );
}

export default App;