const getTokenFrom = (request) => {
  const auth = request.get("authorization")
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    return auth.slice(7)
  }
  return null
}

const tokenExtractor = (request, response, next) => {
  const auth = request.get("authorization")

  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    request.token = auth.slice(7)
  } else {
    request.token = null
  }

  next()
}

module.exports = { tokenExtractor }