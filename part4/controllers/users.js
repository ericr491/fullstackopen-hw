const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (req, res, next) => {
  const body = req.body

  const user = new User({
    username: body.username,
    name: body.name || body.username,
    password: body.password,
  })

  try {
    const savedUser = await user.save()

    res.json(savedUser.toJSON())
  } catch (exception) {
    next(exception)
  }

})

userRouter.get('/', async (req, res) => {
  const response = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1, })
  res.json(response)
})

module.exports = userRouter