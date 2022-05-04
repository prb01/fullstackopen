const { UserInputError, AuthenticationError } = require("apollo-server")
const Person = require("./models/person")
const User = require("./models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const saltRounds = 10
const { PubSub } = require("graphql-subscriptions")

const pubsub = new PubSub()

const resolvers = {
  Query: {
    personCount: async () => await Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      if (!args.phone) {
        return Person.find({}).populate("friendOf")
      }

      return Person.find({
        phone: { $exists: args.phone === "YES" },
      }).populate("friendOf")
    },
    findPerson: async (root, args) => Person.findOne({ name: args.name }),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Person: {
    address: ({ street, city }) => {
      return {
        street,
        city,
      }
    },
    // friendOf: async (root) => {
    //   const friends = await User.find({
    //     friends: { $in: [root._id] },
    //   })

    //   return friends
    // },
  },
  Mutation: {
    addPerson: async (root, args, context) => {
      const person = new Person({ ...args })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      try {
        await person.save()
        currentUser.friends = currentUser.friends.concat(person)
        await currentUser.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish("PERSON_ADDED", { personAdded: person })

      return person
    },
    editNumber: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const person = await Person.findOne({ name: args.name })
      person.phone = args.phone

      try {
        await person.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return person
    },
    addAsFriend: async (root, args, { currentUser }) => {
      const nonFriendAlready = (person) =>
        !currentUser.friends
          .map((f) => f._id.toString())
          .includes(person._id.toString())

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const person = await Person.findOne({ name: args.name })
      if (nonFriendAlready(person)) {
        currentUser.friends = currentUser.friends.concat(person)
      }

      await currentUser.save()

      return currentUser
    },
    createUser: async (root, args) => {
      if (args.password.length < 6) {
        throw new UserInputError("password must be at least 6 chars")
      }

      const passwordhash = await bcrypt.hash(args.password, saltRounds)
      const user = new User({ username: args.username, passwordhash })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (
        !user ||
        !(await bcrypt.compare(args.password, user.passwordhash))
      ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterator(["PERSON_ADDED"]),
    },
  },
}

module.exports = resolvers
