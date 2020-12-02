import React from 'react'

const Footer = () => {
  const footerStyle = {
    display: 'flex',
    justifyContent: 'center',
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
  }
  return (
    <div className="container" style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2020</em>
    </div>
  )
}

export default Footer
