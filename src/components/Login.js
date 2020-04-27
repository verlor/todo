import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../api/courseApi'
import { Redirect } from 'react-router-dom'

const Login = props => {
  const { cookies } = props
  const [formObj, setForm] = useState({})

  function handleChange(event) {
    const { name, value } = event.target
    setForm({ ...formObj, [name]: value })
  }

  const handleSaveP = event => {
    event.preventDefault()
    login(formObj).then(resp => {
      if (resp.status === 200) {
        resp.json().then(function(data) {
          cookies.set('token', data[0].token, {
            maxAge: 3600 // Will expire after 1hr (value is in number of sec.)
          })
          cookies.set('isLogged', 1, {
            maxAge: 3600 // Will expire after 1hr (value is in number of sec.)
          })
          return <Redirect to="/" />
        })
      }
    })
  }

  // console.log(cookies.get('name'))
  return (
    <>
      <h1>Login</h1>
      <form
        style={{ display: 'flex', justifyContent: 'center' }}
        onSubmit={handleSaveP}
      >
        <div>
          <label>
            <b>Username</b>
          </label>
          <br />
          <input
            type="text"
            placeholder="Enter Username"
            name="email"
            value={formObj.uname}
            onChange={handleChange}
            required
          />
          <br />
          <label>
            <b>Password</b>
          </label>
          <br />
          <input
            type="password"
            placeholder="Enter Password"
            name="pass"
            value={formObj.psw}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <input type="submit" value="Submit" />
        </div>
      </form>
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    cookies: ownProps.cookies
  }
}

export default connect(mapStateToProps, null)(Login)
