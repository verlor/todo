import React from 'react'
import PropTypes from 'prop-types'
import TodoTextInput from './TodoTextInput'
import { useCookies } from 'react-cookie'

const Header = ({ postTask }) => {
  const [cookies] = useCookies()
  return (
    <header className="header">
      <h1>todos</h1>
      <TodoTextInput
        newTodo
        onSave={text => {
          if (text.length !== 0) {
            postTask({ text }, cookies.token)
          }
        }}
        placeholder="What needs to be done?"
      />
    </header>
  )
}

Header.propTypes = {
  postTask: PropTypes.func.isRequired
}

export default Header
