const { TestWatcher } = require("jest")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const helper = require("./test_helper")

jest.setTimeout(15000)

beforeEach(async () => {
  // await mongoose.connection.close()
  await Blog.deleteMany({})

  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe("GET /api/blogs", () => {
  test("blogs returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("all blogs returned", async () => {
    const blogs = await api
      .get("/api/blogs")

      expect(blogs.body.length).toEqual(helper.initialBlogs.length)
  })

  test("blog has 'id' property", async () => {
    const blogs = await api
      .get("/api/blogs")
    const blog = blogs.body[0]

    expect(blog.id).toBeDefined()
  })
})

describe("POST /api/blogs", () => {
  const newBlog = {
    title: "Buster loves Lucille",
    author: "Buster Bluth",
    url: "https://www.motherboy.com",
    likes: 1,
  }

  test("blog returned as json with 201 status", async () => {
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)
  })

  test("length increases by one", async () => {
    await api
      .post("/api/blogs")
      .send(newBlog)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })

  test("new blog is in db", async () => {
    await api
      .post("/api/blogs")
      .send(newBlog)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).toContainEqual(newBlog.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})