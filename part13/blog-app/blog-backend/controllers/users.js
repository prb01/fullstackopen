const { User, Blog } = require("../models")
const usersRouter = require("express").Router()
const { userFinder } = require("../util/middleware")
const bcrypt = require("bcrypt")
const saltRounds = 12

usersRouter.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: {exclude: ["userId"]},
    },
  })
  
  res.json(users)
})

usersRouter.post("/", async (req, res) => {
  const { username, password, name } = req.body

  const newUser = await User.build({ username, password, name })
  newUser.passwordHash = await bcrypt.hash(password, saltRounds)
  await newUser.save()

  return res.json({ username, name })
})

usersRouter.put("/:username", userFinder, async (req, res) => {
  const { username } = req.body

  if (req.user) {
    req.user.username = username
    await req.user.save()
    res.json({ username })
  } else {
    res.status(404).end()
  }
})

module.exports = usersRouter
