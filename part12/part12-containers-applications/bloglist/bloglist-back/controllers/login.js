const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const loginRouter = require("express").Router()

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = await bcrypt.compare(
    password,
    user?.passwordhash || ""
  )

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "username and/or password incorrect",
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = await jwt.sign(userForToken, process.env.SECRET)

  response
  .status(200)
  .json({ token, username: user.username, name: user.name, id: user._id })
})

module.exports = loginRouter
