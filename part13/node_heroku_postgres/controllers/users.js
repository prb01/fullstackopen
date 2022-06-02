const usersRouter = require("express").Router()
const { User, Note, Team } = require("../models")
const { tokenExtractor, isAdmin } = require("../util/middleware")

usersRouter.get("/", async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Note,
        attributes: { exclude: ["userId"] },
      },
      {
        model: Team,
        attributes: ["name", "id"],
        through: { attributes: [] },
      },
    ],
  })
  res.json(users)
})

usersRouter.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

usersRouter.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

usersRouter.put(
  "/:username",
  tokenExtractor,
  isAdmin,
  async (req, res) => {
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
    })

    console.log(user)

    if (user) {
      console.log(req.body.disabled)
      user.disabled = req.body.disabled
      await user.save()
      res.json(user)
    } else {
      res.status(404).end()
    }
  }
)

module.exports = usersRouter
