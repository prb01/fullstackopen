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

describe("When retrieving blogs (GET)", () => {
  test("return json with 200 status", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("return all blogs", async () => {
    const blogs = await api.get("/api/blogs")

    expect(blogs.body.length).toEqual(helper.initialBlogs.length)
  })

  test("blogs have 'id' property", async () => {
    const blogs = await api.get("/api/blogs")
    const blog = blogs.body[0]

    expect(blog.id).toBeDefined()
  })
})

describe("When adding new blog (POST)", () => {
  const newBlog = {
    title: "Buster loves Lucille",
    author: "Buster Bluth",
    url: "https://www.motherboy.com",
    likes: 1,
  }

  test("return json with 201 status", async () => {
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)
  })

  test("db length increases by one", async () => {
    await api.post("/api/blogs").send(newBlog)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })

  test("new blog content is in db", async () => {
    await api.post("/api/blogs").send(newBlog)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map((blog) => blog.title)

    expect(titles).toContainEqual(newBlog.title)
  })
})

describe("When creating blog with missing properties", () => {
  test("return 0 likes if likes property is missing", async () => {
    const newBlogNoLikes = {
      title: "Buster loves Lucille",
      author: "Buster Bluth",
      url: "https://www.motherboy.com",
    }

    const savedBlog = await api.post("/api/blogs").send(newBlogNoLikes)
    
    expect(savedBlog.body.likes).toBeDefined()
    expect(savedBlog.body.likes).toEqual(0)
  })

  test("return 400 bad request if title is missing", async () => {
    const newBlogNoTitle = {
      url: "https://www.motherboy.com",
      author: "Buster Bluth",
      likes: 1,
    }
    
    await api
    .post("/api/blogs")
    .send(newBlogNoTitle)
    .expect(400)
  })

  test("return 400 bad request if url is missing", async () => {
    const newBlogNoUrl = {
      title: "Buster loves Lucille",
      author: "Buster Bluth",
      likes: 1,
    }
    
    await api
    .post("/api/blogs")
    .send(newBlogNoUrl)
    .expect(400)
  })

  test("returns 400 bad request if title & url are missing", async () => {
    const newBlogNoTitleUrl = {
      author: "Buster Bluth",
      likes: 1
    }
  
    await api
    .post("/api/blogs")
    .send(newBlogNoTitleUrl)
    .expect(400)
  })
})

describe("When deleting a blog", () => {
  let blogsAtStart
  let blogToDelete

  beforeEach(async () => {
    blogsAtStart = await helper.blogsInDb()
    blogToDelete = blogsAtStart[0]
  })
  
  test("return status 204", async () => {
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  })

  test("db length reduced by one", async () => {
    await api.delete(`/api/blogs/${blogToDelete.id}`)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toEqual(blogsAtStart.length - 1)
  })

  test("deleted blog's content no longer in db", async () => {
    await api.delete(`/api/blogs/${blogToDelete.id}`)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).not.toContainEqual(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
