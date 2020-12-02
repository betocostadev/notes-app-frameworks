import React from 'react'
import Container from '@material-ui/core/Container'

const Footer = () => {
  const footerStyle = {
    display: 'flex',
    justifyContent: 'center',
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
  }
  return (
    <Container style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2020</em>
    </Container>
  )
}

export default Footer
