import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'

export default class TodoItem extends Component {

  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      editing: false
    }
  }


  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  handleSave = (id, text, cookie) => {
    if (text.length > 0) {
      this.props.editTodo(id, text, cookie)
    } 
    this.setState({ editing: false })
  }

  render() {
    const { todo, completeTodo, deleteTask, cookies } = this.props
    let element
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={text => this.handleSave(todo.id, text, cookies)}
        />
      )
    } else {
      element = (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => completeTodo(todo.id, cookies)}
          />
          <label onDoubleClick={this.handleDoubleClick}>{todo.text}</label>
          <button className="destroy" onClick={() => deleteTask(todo.id, cookies)} />
        </div>
      )
    }

    return (
      <li
        className={classnames({
          completed: todo.completed,
          editing: this.state.editing
        })}
      >
        {element}
      </li>
    )
  }
}
