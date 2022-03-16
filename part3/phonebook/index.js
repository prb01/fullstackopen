const express = require("express")
const app = express()
app.use(express.json())

const PORT = 3001

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

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})
