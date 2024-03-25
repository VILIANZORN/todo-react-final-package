import React, { Component } from 'react';

import Footer from '../footer/footer';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';

import './app.css';

export default class App extends Component {
  maxid = 0;

  state = {
    todoData: [],
    filter: 'all',
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => ({ todoData: this.toggleProperty(todoData, id, 'done') }));
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return { todoData: newArray };
    });
  };

  onItemAdded = (label) => {
    this.setState(({ todoData }) => {
      const item = this.createTodoItem(label);
      return { todoData: [item, ...todoData] };
    });
  };

  onClearComp = () => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter((item) => !item.done);
      return { todoData: newTodoData };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  createTodoItem(label) {
    return {
      label,
      done: false,
      id: this.maxid++,
      timeCreated: new Date().toString(),
    };
  }

  filteredTodoData() {
    const { todoData, filter } = this.state;
    switch (filter) {
      case 'active':
        return todoData.filter((item) => !item.done);
      case 'completed':
        return todoData.filter((item) => item.done);
      default:
        return todoData;
    }
  }

  render() {
    const { filter } = this.state;
    const filteredTodos = this.filteredTodoData();
    const doneCount = filteredTodos.filter((item) => item.done).length;
    const todoCount = filteredTodos.length - doneCount;

    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.onItemAdded} />
        <section className="main">
          <TaskList
            todos={filteredTodos}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
          />
          <Footer
            todoCount={todoCount}
            onClearComp={this.onClearComp}
            onFilterChange={this.onFilterChange}
            filter={filter}
          />
        </section>
      </section>
    );
  }
}
