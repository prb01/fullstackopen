import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Recommended = ({ show, user }) => {
  const booksResult = useQuery(ALL_BOOKS, {
      variables: { genre: user ? user.favoriteGenre : undefined },
    })

  if (!show) return null

  if (booksResult.loading || !user) {
    return (<div>recommendations loading</div>)
  }

  const books = booksResult.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favourite genre <strong>{user.favoriteGenre}</strong>
      </p>

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

export default Recommended