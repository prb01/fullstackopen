const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require('cors')

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
morgan.token("req-body", (req, res) => JSON.stringify(req.body))
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
)

const PORT = process.env.PORT || 3001

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]

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
  res.json(persons)
})

//GET PERSONS/ID
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find((p) => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.statusMessage = "Person does not exist"
    res.status(404).end()
  }
})

//DELETE PERSONS/ID
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter((p) => p.id !== id)

  res.status(204).end()
})

const generateId = () => {
  return Math.floor(Math.random() * 10000)
}

//POST PERSONS
app.post("/api/persons", (req, res) => {
  const body = req.body

  if (!body.name) return res.status(400).json({ error: "name missing" })
  if (!body.number) return res.status(400).json({ error: "number missing" })
  if (persons.some((p) => p.name === body.name)) {
    return res.status(400).json({ error: "name already exists" })
  }

  const person = body
  person.id = generateId()
  persons = persons.concat(person)

  res.json(person)
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})
