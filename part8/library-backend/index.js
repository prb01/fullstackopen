require("dotenv").config()
const { ApolloServer } = require("apollo-server-express")
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const express = require("express")
const http = require("http")
const mongoose = require("mongoose")
const User = require("./models/user")
const jwt = require("jsonwebtoken")
const typeDefs = require("./schema")
const resolvers = require("./resolvers")
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const port = process.env.PORT

mongoose
.connect(process.env.MONGODB_URI)
.then((result) => console.log("connected to MongoDB"))
.catch((error) => console.log("error", error))

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)
  const schema = makeExecutableSchema({ typeDefs, resolvers})

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: "" }
  )

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith("bearer ")) {
        const decodedToken = jwt.verify(
          auth.substring(7),
          process.env.JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id)

        return { currentUser }
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close()
            },
          }
        },
      },
    ],
  })

  await server.start()

  server.applyMiddleware({
    app,
    path: "/"
  })


  httpServer.listen(port, () =>
    console.log(`Server is now running on http://localhost:${port}`)
  )
}

start()