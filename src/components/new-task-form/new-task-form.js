import React, { Component } from 'react';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  state = {
    label: '',
  };

  onLabelChange = (event) => {
    this.setState({ label: event.target.value });
  };

  onSubmit = (event) => {
    const { label } = this.state;
    const { onItemAdded } = this.props;

    event.preventDefault();
    if (label === '') {
      return;
    }
    onItemAdded(label);
    this.setState({ label: '' });
  };

  render() {
    const { label } = this.state;
    return (
      <header className="header">
        <h1>Todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={this.onLabelChange}
            value={label}
          />
        </form>
      </header>
    );
  }
}
