import React from 'react'
import { Alert } from '@material-ui/lab'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <Alert
      variant="standard"
      severity={type === 'success' ? 'success' : 'error'} >
      {message}
    </Alert>
  )
}

export default Notification
