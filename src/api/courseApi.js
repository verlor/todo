import { handleResponse, handleError } from './apiUtils'
const baseUrl = process.env.API_URL + '/courses/'
const API_BASE = 'https://neseiza.org/api'
const API_URL = API_BASE + '/todos'
const API_AUTH = API_BASE + '/auth'

export function getCourses() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError)
}

export function getTasks(token) {
  return fetch(API_URL, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
    .then(handleResponse)
    .catch(handleError)
}

export function login(usr) {
  return fetch(API_AUTH, {
    method: 'POST',
    body: JSON.stringify(usr),
    headers: { 'content-type': 'application/json' },
    mimeType: 'multipart/form-data'
  })
}

export function saveTask(task, token) {
  return fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(task),
    headers: {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    mimeType: 'multipart/form-data'
  })
  //const content = await rawResponse
  //return content.headers.get('Location')
}

export function saveCourse(course) {
  return fetch(baseUrl + (course.id || ''), {
    method: course.id ? 'PUT' : 'POST', // POST for create, PUT to update when id already exists.
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(course)
  })
    .then(handleResponse)
    .catch(handleError)
}

export function callUpdateTask(task,token ) {
  return fetch(API_URL + '?id=eq.' + task.id, {
    method: 'PUT',
    headers: { 'content-type': 'application/json',
    Authorization: 'Bearer ' + token },
    body: JSON.stringify(task)
  })
}

export function callDeleteTask(taskId, token) {
  return fetch(API_URL + '?id=eq.' + taskId, { method: 'DELETE',headers: { 'content-type': 'application/json',
  Authorization: 'Bearer ' + token }, })
}

export function deleteCourse(courseId) {
  return fetch(baseUrl + courseId, { method: 'DELETE' })
    .then(handleResponse)
    .catch(handleError)
}
