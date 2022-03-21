const http = require("http")
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const Blog = require("./models/blog")

const password = process.env.PASS

const mongoUrl =
  `mongodb+srv://fullstack:${password}@cluster0.ncd46.mongodb.net/blogApp?retryWrites=true&w=majority`
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
