import * as types from '../constants/ActionTypes'
import * as courseApi from '../api/courseApi'

export const loadTasks = tasks => ({ type: types.SET_ALL_TODOS, tasks })
export const addTodo = task => ({ type: types.ADD_TODO, task })
export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const editTodo = (id, text, cookie) => ({ type: types.EDIT_TODO, id, text, cookie })
export const completeTodo = (id, token) => ({ type: types.COMPLETE_TODO, id, token })
export const completeAllTodos = (cookie) => ({ type: types.COMPLETE_ALL_TODOS, cookie })
export const clearCompleted = (token) => ({ type: types.CLEAR_COMPLETED , token})
export const setVisibilityFilter = filter => ({
  type: types.SET_VISIBILITY_FILTER,
  filter
})

// Middleware thunk handled here

export function deleteTask(taskId, {cookies}) {
  return function(dispatch) {
    return courseApi.callDeleteTask(taskId, cookies.token).then(response => {
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
