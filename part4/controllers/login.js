const jwt = require('jsonwebtoken')
const User = require('../models/user')
const loginRouter = require('express').Router()

loginRouter.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null ? false : user.password === body.password

  if (!user || !passwordCorrect) {
    return res.status(401).json({
      error: "Invalid username and/or password."
    })
  }

  const userForToken = {
    id: user._id,
    username: user.username,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res
    .status(200)
    .send({ token, username: user.username, name: user.name, })
})

module.exports = loginRouter