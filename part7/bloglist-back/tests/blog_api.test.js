const { TestWatcher } = require("jest")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const helper = require("./test_helper")
const jwt = require("jsonwebtoken")

jest.setTimeout(10000)

let token
beforeAll(async () => {
  const userForToken = {
    username: "first",
    id: "62448b752d0e4c2c71c8a688",
  }

  token = await jwt.sign(userForToken, process.env.SECRET)
})

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog)
    blogObject.user = await helper.getUser()
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
      .set("authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)
  })

  test("db length increases by one", async () => {
    await api
      .post("/api/blogs")
      .set("authorization", `Bearer ${token}`)
      .send(newBlog)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })

  test("new blog content is in db", async () => {
    await api
      .post("/api/blogs")
      .set("authorization", `Bearer ${token}`)
      .send(newBlog)

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

    const savedBlog = await api
      .post("/api/blogs")
      .set("authorization", `Bearer ${token}`)
      .send(newBlogNoLikes)
    
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
      .set("authorization", `Bearer ${token}`)
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
      .set("authorization", `Bearer ${token}`)
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
      .set("authorization", `Bearer ${token}`)
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
      .set("authorization", `Bearer ${token}`)
      .expect(204)
  })

  test("db length reduced by one", async () => {
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("authorization", `Bearer ${token}`)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toEqual(blogsAtStart.length - 1)
  })

  test("deleted blog's content no longer in db", async () => {
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("authorization", `Bearer ${token}`)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).not.toContainEqual(blogToDelete.title)
  })
})

describe("When updating an existing blog", () => {
  let blogsAtStart
  let blogToUpdate
  let updatedNote

  beforeEach(async () => {
    blogsAtStart = await helper.blogsInDb()
    blogToUpdate = blogsAtStart[0]
    updatedNote = {
      ...blogToUpdate,
      likes: 22,
    }
  })

  test("return blog as json with 200 status", async () => {
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedNote)
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("returned blog is same as request", async () => {
    const returnedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedNote)

    expect(JSON.stringify(returnedBlog.body)).toContain(JSON.stringify(updatedNote))
  })

  test("length of db has not changed", async () => {
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedNote)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toEqual(blogsAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
