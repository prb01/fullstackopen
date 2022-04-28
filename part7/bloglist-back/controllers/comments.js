const commentsRouter = require("express").Router()
const Comment = require("../models/comment")
const middleware = require("../utils/middleware")

commentsRouter.get("/:id/comments", async (request, response) => {
  const blogId = request.params.id
  const comments = await Comment.find({ blog: blogId }).populate("blog", {
    comments: 0,
  })
  response.json(comments)
})

commentsRouter.post(
  "/:id/comments",
  middleware.blogExtractor,
  async (request, response, next) => {
    const { content } = request.body
    const blog = request.blog

    const comment = new Comment({
      content,
      blog: blog._id,
    })

    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()

    response.status(201).json(savedComment)
  }
)

module.exports = commentsRouter
