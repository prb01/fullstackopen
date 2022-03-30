const express = require("express")
const app = express()
require("express-async-errors")
const cors = require("cors")
const mongoose = require("mongoose")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const config = require("./utils/config")
const middleware = require("./utils/middleware")

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use("/api/blogs", middleware.userExtractor, blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

app.use(middleware.errorHandler)

module.exports = app