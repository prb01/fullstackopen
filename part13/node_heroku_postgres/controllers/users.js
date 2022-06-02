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
        model: Note,
        as: "marked_notes",
        attributes: { exclude: ["userId"] },
        through: { attributes: [] },
        include: { model: User, attributes: ["name"] },
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
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: [""] },
    include: [
      {
        model: Note,
        attributes: { exclude: ["userId"] },
      },
      {
        model: Note,
        as: "marked_notes",
        attributes: { exclude: ["userId"] },
        through: {
          attributes: [],
        },
        include: {
          model: User,
          attributes: ["name"],
        },
      },
    ],
  })

  if (!user) {
    return res.status(404).end()
  }

  let teams = undefined
  if (req.query.teams) {
    teams = await user.getTeams({
      attributes: ["name"],
      joinTableAttributes: [],
    })
  }
  res.json({ ...user.toJSON(), teams })
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
