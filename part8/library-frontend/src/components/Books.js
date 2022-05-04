import { useQuery } from "@apollo/client"
import { useState } from "react"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS)
  const resultByGenre = useQuery(ALL_BOOKS, {
      variables: { genre: genre ? genre : undefined },
    })

  if (!props.show) {
    return null
  }

  if (result.loading || resultByGenre.loading) {
    return <div>loading books...</div>
  }

  const genres = [
    ...new Set(
      result.data.allBooks.reduce((prev, curr) => {
        return prev.concat(curr.genres)
      }, [])
    ),
  ]

  const books = resultByGenre.data.allBooks

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
          {books.map((a) => (
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
