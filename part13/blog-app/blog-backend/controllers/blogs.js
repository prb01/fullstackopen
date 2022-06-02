const { Blog, User } = require("../models")
const blogsRouter = require("express").Router()
const { blogFinder, tokenExtractor } = require("../util/middleware")
const { Op } = require("sequelize")

blogsRouter.get("/", async (req, res) => {
  let where = {}
  if (req.query.search) {
    where = {
      ...where,
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        },
        {
          author: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        },
      ],
    }
  }
  
  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
    where,
    order: [["likes", "DESC"]]
  })
  res.json(blogs)
})

blogsRouter.post("/", tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({ ...req.body, userId: user.id })
  res.json(blog)
})

blogsRouter.get("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

blogsRouter.put("/:id", blogFinder, async (req, res) => {
  const { likes } = req.body

  if (req.blog) {
    req.blog.likes = likes
    await req.blog.save()
    res.json({ likes })
  } else {
    res.status(404).end()
  }
})

blogsRouter.delete(
  "/:id",
  blogFinder,
  tokenExtractor,
  async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)

    if (!(user && user.id === req.blog.userId)) {
      return res
        .status(401)
        .json({ error: "Must be owner to delete" })
        .end()
    }

    if (req.blog) {
      await req.blog.destroy()
    }
    res.status(204).end()
  }
)

module.exports = blogsRouter
