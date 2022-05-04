import { useQuery } from "@apollo/client"
import { useState } from "react"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState(null)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading books...</div>
  }

  const books = result.data.allBooks
  const booksToShow = () => {
    if (!genre) return books
    return books.filter((book) => book.genres.includes(genre))
  }

  const genres = [
    ...new Set(
      books.reduce((prev, curr) => {
        return prev.concat(curr.genres)
      }, [])
    ),
  ]

  return (
    <div>
      <h2>books</h2>

      <div>
        <button onClick={() => setGenre(null)}>all genres</button>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow().map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
