const { Blog, User, Session } = require("../models")
const jwt = require("jsonwebtoken")
const { SECRET } = require("../util/config")

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

const userFinder = async (req, res, next) => {
  req.user = await User.findOne({
    where: { username: req.params.username },
  })
  next()
}

const tokenExtractor = async (req, res, next) => {
  const auth = req.get("authorization")
  if (!(auth && auth.slice(0, 7).toLowerCase() === "bearer ")) {
    return res.status(401).json({ error: "token missing" })
  }

  try {
    req.decodedToken = jwt.verify(auth.slice(7), SECRET)
    req.sessionToken = await Session.findOne({
      where: { sessionToken: req.decodedToken.sessionToken },
    })
    if (!req.sessionToken) throw "error"
  } catch (error) {
    res.status(401).json({ error: "token invalid" }).end()
  }

  next()
}

const errorHandler = (error, request, response, next) => {
  if (error.name === "SequelizeValidationError") {
    return response
      .status(401)
      .json({ error: error.errors.map((error) => error.message) })
  } else if (error.name === "SyntaxError") {
    return response.status(401).json({ error: `${error}` })
  } else if (error.name === "SequelizeDatabaseError") {
    return response.status(401).json({ error: `${error}` })
  }
  console.log("error name:", error.name)

  next(error)
}

module.exports = {
  blogFinder,
  userFinder,
  tokenExtractor,
  errorHandler,
}
