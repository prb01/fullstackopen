const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const middleware = require("../utils/middleware")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {blogs: 0})
  response.json(blogs)
})

blogsRouter.post("/", middleware.userExtractor, async (request, response, next) => {
  const { title, author, url, likes, userId } = request.body
  const token = request.token
  if (!token) {
    return response.status(401).json({
      error: "token missing",
    })
  }

  const user = request.user
  
  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id
  })

  if (!blog.title || !blog.url) return response.status(400).end()

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put("/:id", async (request, response, next) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true})
  response.json(updatedBlog)
})

blogsRouter.delete("/:id", middleware.userExtractor, async (request, response, next) => {
  const token = request.token
  if (!token) {
    return response.status(401).json({
      error: "token missing",
    })
  }

  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!(user._id.toString() === blog.user.toString())) {
    return response.status(401).json({
      error: "user unauthorized to perform this action",
    })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter