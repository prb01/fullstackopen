import { gql } from "@apollo/client"

export const BOOK_COUNT = gql`
  query bookCount($author: String) {
    bookCount(author: $author)
  }
`

export const AUTHOR_COUNT = gql`
  query {
    authorCount
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      published
      author
      genres
    }
  }
`