const { gql } = require("apollo-server")

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount(author: String): Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]
    me: User
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
    createUser(
      username: String!
      password: String!
      favoriteGenre: String!
    ): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`
module.exports = typeDefs