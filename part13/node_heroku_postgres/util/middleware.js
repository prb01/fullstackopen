const { SECRET } = require("../util/config")
const jwt = require("jsonwebtoken")
const { User } = require("../models")

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization")

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch {
      res.status(401).json({ error: "token invalid" })
    }
  } else {
    res.status(401).json({ error: "token missing" })
  }

  next()
}

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)
  if (!user.admin) {
    return res.status(401).json({ error: "operation not allowed" })
  }
  next()
}

module.exports = {
  tokenExtractor,
  isAdmin,
}