import * as types from '../constants/ActionTypes'
import * as courseApi from '../api/courseApi'

export const loadTasks = tasks => ({ type: types.SET_ALL_TODOS, tasks })
export const addTodo = task => ({ type: types.ADD_TODO, task })
export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text })
export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
export const completeAllTodos = () => ({ type: types.COMPLETE_ALL_TODOS })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })
export const setVisibilityFilter = filter => ({
  type: types.SET_VISIBILITY_FILTER,
  filter
})

// Middleware thunk handled here

export function deleteTask(taskId) {
  return function(dispatch) {
    return courseApi.callDeleteTask(taskId).then(response => {
      if (response.status === 204) {
        dispatch(deleteTodo(taskId))
      }
    })
  }
}

export function postTask(task, token) {
  return function(dispatch) {
    return courseApi.saveTask(task, token).then(results => {
      const location = results.headers.get('Location')
      const newId = location.substr(location.indexOf('.') + 1)
      dispatch(addTodo({ completed: false, id: parseInt(newId), ...task }))
    })
  }
}

export function loadCourses({ cookies }) {
  //console.log(getCookie('token'))
  return function(dispatch) {
    return courseApi.getTasks(cookies.token).then(tasks => {
      dispatch(loadTasks(tasks))
    })
  }
}
// ends thunk middleware
