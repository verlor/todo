import React from 'react'
import { withCookies } from 'react-cookie'
import Home from './Home'
import Login from './Login'

const App = ({ cookies }) => {
  if (cookies.cookies.isLogged === '1') {
    return <Home cookies={cookies} />
  } else {
    return <Login cookies={cookies} />
  }
}

export default withCookies(App)
