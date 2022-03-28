const { TestWatcher } = require("jest")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const helper = require("./test_helper")

jest.setTimeout(15000)

beforeEach(async () => {
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
})

afterAll(() => {
  mongoose.connection.close()
})