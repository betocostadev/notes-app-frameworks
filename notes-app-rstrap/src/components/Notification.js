import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <Alert variant={type === 'success' ? 'success' : 'danger'} >
      {message}
    </Alert>
  )
}

export default Notification
