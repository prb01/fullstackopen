const { User, Session } = require("../models")
const sessionsRouter = require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { SECRET } = require("../util/config")
const { randomBytes } = require("crypto")
const { tokenExtractor } = require("../util/middleware")

sessionsRouter.post("/login", async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ where: { username } })
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
    sessionToken: randomBytes(64).toString("hex"),
  }
  const token = await jwt.sign(userForToken, SECRET)

  await Session.create({
    userId: user.id,
    sessionToken: userForToken.sessionToken,
  })

  return res.status(200).send({ token, username, name: user.name })
})

sessionsRouter.delete("/logout", tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  
  if (req.sessionToken) {
    await Session.destroy({
      where: { userId: user.id },
    })
  }

  res.status(204).end()
})

module.exports = sessionsRouter
