const Blog = require("../models/blog")

const initialBlogs = [
  {
    title: "Boblaw Law Blog",
    author: "Bobby Boblaw",
    url: "https://www.boblawlawblog.com",
    likes: 5,
  },
  {
    title: "Terry Crew's: How to eat less",
    author: "Terry Crew",
    url: "https://www.eatlessnotmore.com",
    likes: 2,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb }
