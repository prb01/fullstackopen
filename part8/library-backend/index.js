require("dotenv").config()
const { ApolloServer, gql } = require("apollo-server")
const { v4: uuidv4 } = require("uuid")
const mongoose = require("mongoose")
const Author = require("./models/author")
const Book = require("./models/book")

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => console.log("connected to MongoDB"))
  .catch((error) => console.log("error", error))

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
]

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
    bookCount: (root, args) => {
      if (!args.author) return Book.collection.countDocuments()
      // return books.filter((b) => b.author === args.author).length
    },
    authorCount: (root) => {
      return Author.collection.countDocuments()
    },
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) return Book.find({})
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
    }
  },
  Author: {
    bookCount: async (root, args) => {
      return await Book.count({ author: root._id })
      // return books.filter((b) => b.author === root.name).length
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author })

      if (!author) {
        throw new UserInputError("author not in db")
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

      return author.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name)
      if (!author) return null

      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map((a) =>
        a.name === args.name ? updatedAuthor : a
      )
      return updatedAuthor
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
