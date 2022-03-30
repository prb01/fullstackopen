const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const blogsRouter = require("./controllers/blogs")
const userssRouter = require("./controllers/users")
const config = require("./utils/config")
require("express-async-errors")

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogsRouter)
app.use("/api/users", userssRouter)

module.exports = app