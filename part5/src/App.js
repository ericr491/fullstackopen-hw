import React, { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    const user = window.localStorage.getItem('user')
    if (user) {
      const parsedUser = JSON.parse(user)
      blogService.setToken(parsedUser.token)
      setUser(parsedUser)
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs(blogs.blogs.sort((a, b) => b.likes - a.likes)))
    }
  }, [user])

  useEffect(() => {
    setBlogs(blogs.sort((a, b) => b.likes - a.likes))
  }, [blogs, setBlogs])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      setMessage('wrong username or password')
      setInterval(() => {
        setMessage('')
      }, 3000)
    }
  }

  const handleRegister = async () => {
    try {
      const res = await loginService.register({ username, password })
      setUsername('')
      setPassword('')
      try {
        setMessage(res.data.error)
      } catch (error) {
        setMessage('successfully registered')
      }
      setInterval(() => {
        setMessage('')
      }, 3000)
    } catch (exception) {
      setMessage(exception.data)
      setInterval(() => {
        setMessage('')
      }, 3000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <Login
        user={user}
        username={username}
        password={password}
        setUser={setUser}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
        message={message}
        handleRegister={handleRegister}
      />
    </Togglable>
  )

  const blogForm = () => (
    <BlogForm
      user={user}
      setUser={setUser}
      blogs={blogs}
      setBlogs={setBlogs}
    />
  )

  return (
    <div>
      {user === null && loginForm()}
      {user && blogForm()}
    </div>
  )
}

export default App