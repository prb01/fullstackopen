require("dotenv").config()
const { ApolloServer, UserInputError, gql } = require("apollo-server")
const mongoose = require("mongoose")
const Author = require("./models/author")
const Book = require("./models/book")

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => console.log("connected to MongoDB"))
  .catch((error) => console.log("error", error))

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount(author: String): Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Book
    addAuthor(name: String!, born: Int): Author
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

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

      // return books.filter((b) =>
      //   args.author
      //     ? b.author === args.author
      //     : true && args.genre
      //     ? b.genres.includes(args.genre)
      //     : true
      // )
    },
    allAuthors: async (root) => {
      return Author.find({})
    },
  },
  Book: {
    author: async (root, args) => {
      return Author.findById(root.author)
    },
  },
  Author: {
    bookCount: async (root, args) => {
      return Book.count({ author: root._id })
      // return books.filter((b) => b.author === root.name).length
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author })

      if (!author) {
        throw new UserInputError("author not in db")
      }

      if (args.title.length < 2) {
        throw new UserInputError("title length too short")
      }

      const book = new Book({ ...args, author: author._id })

      return book.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    addAuthor: async (root, args) => {
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
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) return null

      author.born = args.setBornTo
      
      return author.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
