const { User } = require("../models")
const loginRouter = require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { SECRET } = require("../util/config")

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ where: { username } })
  console.log(user)
  const pwdCheck = await bcrypt.compare(password, user.passwordHash)

  if (!(user && pwdCheck)) {
    return res
      .status(401)
      .json({ error: "Invalid Username or Password" })
      .end()
  }

  const userForToken = {
    id: user.id,
    username: username,
    name: user.name,
  }

  const token = await jwt.sign(userForToken, SECRET)

  return res.status(200).send({ token, username, name: user.name })
})

module.exports = loginRouter
