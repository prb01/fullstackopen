const { Blog } = require("../models")
const blogsRouter = require("express").Router()
const { blogFinder } = require("../util/middleware")

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

blogsRouter.post("/", async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body)
    return res.json(newBlog)
  } catch (error) {
    return res.status(400).json({ error })
  }
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

blogsRouter.delete("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy()
  }
  res.status(204).end()
})

module.exports = blogsRouter
