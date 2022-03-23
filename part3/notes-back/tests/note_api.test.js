const { TestWatcher } = require("jest")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Note = require("../models/note")
const test_helper = require("./test_helper")

beforeEach(async () => {
  await Note.deleteMany({})

  for (const note of test_helper.initialNotes) {
    const noteObject = new Note(note)
    await noteObject.save()
  }
})

test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("all notes are returned", async () => {
  const response = await api.get("/api/notes")

  expect(response.body).toHaveLength(test_helper.initialNotes.length)
})

test("a specific note is within the returned notes", async () => {
  const response = await api.get("/api/notes")

  const contents = response.body.map(r => r.content)
  expect(contents).toContain(test_helper.initialNotes[0].content)
})

test("a valid note can be added", async () => {
  const newNote = {
    content: "new test note",
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const notesAtEnd = await test_helper.notesInDb()
  const contents = notesAtEnd.map((n) => n.content)

  expect(notesAtEnd).toHaveLength(test_helper.initialNotes.length + 1)
  expect(contents).toContain(newNote.content)
})

test("a note without content can NOT be added", async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const notesAtEnd = await test_helper.notesInDb()

  expect(notesAtEnd).toHaveLength(test_helper.initialNotes.length)
})

afterAll(() => {
  mongoose.connection.close()
})
