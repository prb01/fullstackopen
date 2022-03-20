require("dotenv").config()
const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/person")

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
app.get("/info", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      const now = new Date()
      const len = persons.length

      res.send(
        `<p>Phonebook has info for ${len} people.</p>
      <p>${now}</p>`
      )
    })
    .catch((error) => next(error))
})

//GET PERSONS
app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons)
    })
    .catch((error) => next(error))
})

//GET PERSONS/ID
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      res.json(person)
    })
    .catch((error) => next(error))
})

//DELETE PERSONS/ID
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

//POST PERSONS
app.post("/api/persons", (req, res, next) => {
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

  person
    .save()
    .then((savedPerson) => {
      res.json(person)
    })
    .catch((error) => next(error))
})

//PUT PERSONS (update)
app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      if (!updatedPerson) throw { name: "MissingError" }
      res.json(updatedPerson)
    })
    .catch((error) => {
      next(error)
    })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" })
  }

  if (error.name === "ValidationError") {
    return res.status(400).send({ error: error.message })
  }

  if (error.name === "MissingError") {
    return res.status(400).send({ error: "Data entry is missing"})
  }

  next(error)
}
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})
