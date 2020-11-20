import React from 'react'

const Notification = ({ message, color }) => {
  const red = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const green = {
    color: 'green',
    background: 'white',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div className='notification'>
      {message !== '' && <div style={color === 'red' ? red : color === 'green' ? green : ''}>
        {message}
      </div>}
    </div>
  )

}

export default Notification