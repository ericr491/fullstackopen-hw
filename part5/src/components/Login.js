import React from 'react'
import Notification from './Notification'

const Login = ({
  username,
  password,
  setPassword,
  setUsername,
  handleLogin,
  message,
  handleRegister,
}) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>log in to application</h2>
        <Notification message={message} color='red' />
        <div>
          username <input
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button id='login-button' type='submit'>login</button>
      </form>
      <div>
        <button id='register-button' onClick={() => handleRegister()}>register</button>
      </div>
    </div>
  )
}

export default Login