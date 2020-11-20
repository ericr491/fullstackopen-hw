import React, { useState, useRef } from 'react'
import Notification from './Notification'
import CreateBlogForm from './CreateBlogForm'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import Blog from './Blog'

const BlogForm = ({
  user,
  setUser,
  blogs,
  setBlogs
}) => {
  const createBlogFormRef = useRef()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [message, setMessage] = useState('')

  const handleBlogCreate = async (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url,
    }
    const postedBlog = await blogService.createBlog(blog)
    setBlogs([...blogs, postedBlog])
    createBlogFormRef.current.toggleVisibility()
    setMessage(`a new blog ${title} by ${author} added`)
    setInterval(() => {
      setMessage('')
    }, 3000)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const createBlogForm = () => (
    <Togglable buttonLabel='new blog' ref={createBlogFormRef}>
      <CreateBlogForm
        handleBlogCreate={handleBlogCreate}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
      />
    </Togglable>
  )

  const handleBlogLike = async (blog) => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: Number(blog.likes) + 1,
      user: blog.user,
    }
    const response = await blogService.likeBlog(blog.id, newBlog)
    setBlogs(blogs.map(blog => blog.id !== response.id ? blog : response))
    setMessage(`liked ${response.title} by ${response.author}`)
    setInterval(() => {
      setMessage('')
    }, 3000)
  }

  const handleBlogDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter(aBlog => aBlog.id !== blog.id))
      setMessage(`${blog.title} has been deleted`)
      setInterval(() => {
        setMessage('')
      }, 3000)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} color='green' />
      {user.name} is logged in.
      <button
        onClick={() => {
          setUser(null)
          window.localStorage.removeItem('user')
        }}>logout</button>
      <h2>create new</h2>
      {createBlogForm()}
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleBlogLike={handleBlogLike}
          handleBlogDelete={handleBlogDelete}
        />
      )}
    </div>
  )
}

export default BlogForm 