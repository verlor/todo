import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL_TODOS,
  CLEAR_COMPLETED,
  SET_ALL_TODOS
} from '../constants/ActionTypes'

import { callUpdateTask, callDeleteTask } from '../api/courseApi'

const initialState = []

export default function todos(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_TODOS:
      return state.concat(action.tasks)
    case ADD_TODO:
      return [...state, action.task]
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id)

    case EDIT_TODO:
      return state.map(todo => {
        if (todo.id === action.id) {
          const newTodo = { ...todo, text: action.text }
          callUpdateTask(newTodo)
          return newTodo
        } else return todo
      })

    case COMPLETE_TODO:
      return state.map(todo => {
        if (todo.id === action.id) {
          const newTodo = { ...todo, completed: !todo.completed }
          callUpdateTask(newTodo)
          return newTodo
        } else return todo
      })

    case COMPLETE_ALL_TODOS:
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => {
        const newTodo = {
          ...todo,
          completed: !areAllMarked
        }
        callUpdateTask(newTodo)
        return newTodo
      })

    case CLEAR_COMPLETED:
      state.map(todo => {
        if (todo.completed === true) callDeleteTask(todo.id)
      })
      return state.filter(todo => todo.completed === false)

    default:
      return state
  }
}
