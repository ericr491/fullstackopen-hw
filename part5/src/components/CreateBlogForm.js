import React from 'react'

const CreateBlogForm = ({
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  handleBlogCreate
}) => {
  return (
    <form onSubmit={handleBlogCreate}>
      <div>
        title: <input
          id='title'
          type='text'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          name='Title'
        />
      </div>
      <div>
        author: <input
          id='author'
          type='text'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          name='Author'
        />
      </div>
      <div>
        url: <input
          id='url'
          type='text'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          name='Url'
        />
      </div>
      <button id='create-blog-button' type='submit'>create</button>
    </form>
  )
}

export default CreateBlogForm