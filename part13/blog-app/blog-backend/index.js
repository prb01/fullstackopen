const express = require("express")
require("express-async-errors")
const app = express()
const { connectToDatabase } = require("./util/db")
const { PORT } = require("./util/config")
const {
  blogsRouter,
  usersRouter,
  sessionsRouter,
  authorsRouter,
  readingListsRouter,
} = require("./controllers")
const middleware = require("./util/middleware")

app.use(express.json())

app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/authors", authorsRouter)
app.use("/api/readinglists", readingListsRouter)
app.use("/api/session", sessionsRouter)

app.use(middleware.errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
