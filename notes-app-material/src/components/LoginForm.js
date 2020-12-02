import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import {  Button,  TextField } from '@material-ui/core'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault()
    login({ username, password })
    history.push('/')
  }

  const handleFields = (event) => {
    event.target.name === 'username-input'
      ? setUsername(event.target.value)
      : setPassword(event.target.value)
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            id="username-input"
            name="username-input"
            label="Username"
            value={username}
            onChange={handleFields}
            required />
        </div>
        <div>
          <TextField
            id="password-input"
            name="password-input"
            label="password"
            type="password"
            value={password}
            onChange={handleFields}
            required />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">login</Button>
        </div>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm
