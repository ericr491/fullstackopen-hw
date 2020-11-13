const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (req, res) => {
  if (!req.token || !req.decodedToken) {
    return res.status(401).json({
      error: "Token missing or invalid token."
    })
  }

  const blogs = await User
    .findById(req.decodedToken.id)
    .populate('blogs', { title: 1, author: 1, likes: 1, url: 1 })

  res.json(blogs)
})


blogRouter.post('/', async (req, res, next) => {
  const body = req.body

  if (!req.token || !req.decodedToken) {
    return res.status(401).json({
      error: "Token missing or invalid token."
    })
  }

  const user = await User.findById(req.decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  })

  try {
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    res.status(201).json(result)
  } catch (exception) {
    next(exception)
  }
})

blogRouter.delete('/:id', async (req, res) => {
  if (!req.token || !req.decodedToken) {
    return res.status(401).json({
      error: 'token is missing/invalid'
    })
  }

  try {
    const blog = await Blog.findById(req.params.id)
    if (req.decodedToken.id.toString() === blog.user.toString()) {
      await Blog.findByIdAndDelete(req.params.id)
      res.status(204).end()
    } else {
      res.status(404).end() // invalid token
    }
  } catch (exception) {
    res.status(400).end() // id not found
  }


})

blogRouter.delete('/', async (req, res) => {
  await Blog.deleteMany({})
  res.status(204).end()
})

blogRouter.put('/:id', async (req, res, next) => {
  const body = req.body

  const updatedBlog = {
    likes: body.likes,
  }

  try {
    const returnedBlog = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, { new: true })
    res.json(returnedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogRouter