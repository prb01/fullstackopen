const { Blog } = require("../models")
const { sequelize } = require("../models/blog")
const authorsRouter = require("express").Router()

authorsRouter.get("/", async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("title")), "articles"],
      "likes",
    ],
    group: ["author", "likes"],
    order: [["likes", "DESC"]],
  })
  res.send(authors)
})

module.exports = authorsRouter
