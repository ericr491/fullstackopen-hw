import React, { useState } from 'react'

const Blog = ({
  blog,
  handleBlogLike,
  handleBlogDelete }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className='blog' style={blogStyle}>
      {!visible && <div>
        {blog.title} {blog.author}
      </div>}
      <button
        onClick={() => setVisible(!visible)}>
        {!visible ? 'view' : 'hide'}
      </button>
      {visible && <div>
        <div>{blog.title}</div>
        <div>{blog.url}</div>
        <div>
          likes: {blog.likes}
          <button id={`like-blog-button-${blog.id.toString()}`} onClick={() => handleBlogLike(blog)}>like</button>
        </div>
        <div>{blog.author}</div>
        <div>
          <button id={`remove-blog-button-${blog.id.toString()}`} onClick={() => handleBlogDelete(blog)}>remove</button>
        </div>
      </div>}
    </div>
  )
}

export default Blog
