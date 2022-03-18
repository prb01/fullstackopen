require('dotenv').config()
const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
morgan.token("req-body", (req, res) => JSON.stringify(req.body))
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
)

const PORT = process.env.PORT

//GET INFO
app.get("/info", (req, res) => {
  const now = new Date()
  const len = persons.length

  res.send(
    `<p>Phonebook has info for ${len} people.</p>
    <p>${now}</p>`
  )
})

//GET PERSONS
app.get("/api/persons", (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

//GET PERSONS/ID
app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person)
  })
})

//DELETE PERSONS/ID
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter((p) => p.id !== id)

  res.status(204).end()
})

//POST PERSONS
app.post("/api/persons", (req, res) => {
  const body = req.body

  if (!body.name) return res.status(400).json({ error: "name missing" })
  if (!body.number) return res.status(400).json({ error: "number missing" })
  // if (persons.some((p) => p.name === body.name))
  // if (Person.find({name: {$eq: body.name}})) {
  //   return res.status(400).json({ error: "name already exists" })
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    res.json(person)
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})
