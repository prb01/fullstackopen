const { UserInputError, AuthenticationError } = require("apollo-server")
const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")
const jwt = require("jsonwebtoken")
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const bcrypt = require("bcrypt")
const saltRounds = 10

const resolvers = {
  Query: {
    bookCount: async (root, args) => {
      if (!args.author) return Book.collection.countDocuments()

      const author = await Author.findOne({ name: args.author })
      return Book.count({ author: author._id })
    },
    authorCount: (root) => {
      return Author.collection.countDocuments()
    },
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) return Book.find({})

      const author = await Author.findOne({ name: args.author })

      if (args.author && args.genre) {
        return Book.find({
          author: author._id,
          genres: { $in: [args.genre] },
        })
      } else if (args.author) {
        return Book.find({ author: author._id })
      } else {
        return Book.find({ genres: { $in: [args.genre] } })
      }
    },
    allAuthors: async (root) => {
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Book: {
    author: async (root, args) => {
      return Author.findById(root.author)
    },
  },
  Author: {
    bookCount: async (root) => {
      return root.books.length
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      
      if (args.title.length < 2) {
        throw new UserInputError("title length too short")
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author })
        await author.save().catch((error) => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
      }

      const book = new Book({ ...args, author: author._id })

      pubsub.publish("BOOK_ADDED", { bookAdded: book })

      return book.save().then(book => {
        author.books.push(book._id)
        author.save()
        return book
      }).catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    addAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = new Author({ ...args })

      if (args.name.length < 4) {
        throw new UserInputError("author name length too short")
      }

      return author.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) return null

      author.born = args.setBornTo

      return author.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    createUser: async (root, args) => {
      if (args.password.length < 6) {
        throw new UserInputError("password length too short")
      }

      const passwordHash = await bcrypt.hash(args.password, saltRounds)
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
        passwordHash,
      })

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
        !(await bcrypt.compare(args.password, user.passwordHash))
      ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
    deleteAllBooks: async () => {
      await Book.deleteMany({})
      return true
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"])
    }
  }
}

module.exports = resolvers
