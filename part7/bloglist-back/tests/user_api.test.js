const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const User = require("../models/user")
const helper = require("./test_helper")
const bcrypt = require("bcrypt")

jest.setTimeout(30000)

describe("When there is initially one user in the db", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordhash = await bcrypt.hash("p455w0rd", 10)
    const user = new User({
      name: "First Person",
      username: "first",
      passwordhash
    })

    await user.save()
  })

  test("user creation succeeds with new username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: "Successful User",
      username: "success",
      password: "12345678"
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toEqual(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test("user creation fails with same username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: "Failed User",
      username: "first",
      password: "12345678",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("username already taken")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test("user creation fails without username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: "Failed User",
      password: "12345678",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain(
      "name, username, and password must all be entered"
    )

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test("user creation fails without name", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "fail",
      password: "12345678",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain(
      "name, username, and password must all be entered"
    )

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test("user creation fails without password", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: "Failed User",
      username: "fail",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain(
      "name, username, and password must all be entered"
    )

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test("user creation fails when username is too short", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: "Short Username",
      username: "fa",
      password: "12345678",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("username length must be at least")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test("user creation fails when password is too short", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: "Short Password",
      username: "fail",
      password: "1234567",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("password length must be at least")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(() => {
  mongoose.connection.close()
})