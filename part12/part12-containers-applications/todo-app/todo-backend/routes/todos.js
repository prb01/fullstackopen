const express = require("express")
const { Todo } = require("../mongo")
const router = express.Router()
const { getAsync, setAsync } = require("../redis")

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos)
})

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  })

  const added_todos = await getAsync("added_todos") || 0
  await setAsync("added_todos", Number(added_todos) + 1)

  res.send(todo)
})

const singleRouter = express.Router()

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200)
})

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  res.send(req.todo) // Implement this
})

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const { _id, oldText, oldDone } = req.todo
  const { text, done } = req.body
  const updatedTodo = { _id, text: oldText, done: oldDone, text, done }

  await Todo.findByIdAndUpdate(req.todo._id, updatedTodo, {
    new: true,
    runValidators: true,
    context: "query",
  })

  res.send(updatedTodo) // Implement this
})

router.use("/:id", findByIdMiddleware, singleRouter)

module.exports = router

