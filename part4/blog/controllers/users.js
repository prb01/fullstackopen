const usersRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")

usersRouter.get("/", async (request, response) => {
  const users = await User.find({})
  response.status(200).json(users)
})

usersRouter.post("/", async (request, response) => {
  const { name, username, password } = request.body

  if (!name || !username || !password) {
    return response.status(400).json({
      error: "name, username, and password must all be entered",
    })
  }

  const existingUser = await User.findOne({ username }).exec()
  if (existingUser) {
    return response.status(400).json({
      error: 'username already taken'
    })
  }

  if (username.length < 3) {
    return response.status(400).json({
      error: "username length must be at least 3",
    })
  }

  if (password.length < 8) {
    return response.status(400).json({
      error: "password length must be at least 8",
    })
  }

  const saltrounds = 10
  const passwordhash = await bcrypt.hash(password, saltrounds)
  const userToAdd = new User({
    username,
    name,
    passwordhash
  })

  const savedUser = await userToAdd.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter