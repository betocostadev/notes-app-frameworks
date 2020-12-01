import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

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
    <div className="container">
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            id="username-input"
            type="text"
            value={username}
            name="username-input"
            onChange={handleFields}
          />
          <Form.Label>Password:</Form.Label>
          <Form.Control
            id="password-input"
            type="password"
            value={password}
            name="password-input"
            onChange={handleFields}
          />
          <Button variant="primary" type="submit" disabled={!username.length || !password.length}>login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm
