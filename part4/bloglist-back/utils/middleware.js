const jwt = require("jsonwebtoken")
const User = require("../models/user")

const tokenExtractor = (request, response, next) => {
  const auth = request.get("authorization")

  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    request.token = auth.slice(7)
  } else {
    request.token = null
  }

  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  request.user = await User.findById(decodedToken.id)

  next()
}

const errorHandler = (error, request, response, next) => {
  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" })
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" })
  }

  next(error)
}

module.exports = { tokenExtractor, userExtractor, errorHandler }