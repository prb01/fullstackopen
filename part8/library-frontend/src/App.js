import { useState, useEffect, useImperativeHandle } from "react"
import { useApolloClient, useQuery, useSubscription } from "@apollo/client"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import Recommended from "./components/Recommended"
import { BOOK_ADDED, USER } from "./queries"

const App = () => {
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const userResult = useQuery(USER)
  const client = useApolloClient()

  useEffect(() => {
    const tokenLocal = localStorage.getItem("library-user-token")
    if (tokenLocal) {
      setToken(tokenLocal)

      if (!userResult.loading) {
        setUser(userResult.data.me)
      }
    }
  }, [userResult])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded
      window.alert(`Added new book: ${book.title}`)
    }
  })

  const refetchUserQuery = async () => {
    await client.refetchQueries({
      include: [USER],
    })
  }

  const handleLogout = () => {
    setToken(null)
    setUser(null)
    setPage("authors")
    localStorage.clear()
    client.resetStore() //clear gql cache
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>

        {token ? (
          <span>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommended")}>
              recommended
            </button>
            <button onClick={handleLogout}>logout</button>
          </span>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} token={token} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommended show={page === "recommended"} user={user} />

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setPage={setPage}
        setUser={setUser}
        refetchUserQuery={refetchUserQuery}
      />
    </div>
  )
}

export default App
