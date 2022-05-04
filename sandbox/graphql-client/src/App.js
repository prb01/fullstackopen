import { useQuery, useApolloClient } from "@apollo/client"
import { ALL_PERSONS } from "./queries"
import { useEffect, useState } from "react"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notify from "./components/Notify"
import PhoneForm from "./components/PhoneForm"
import LoginForm from "./components/LoginForm"

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const localToken = localStorage.getItem("phonenumbers-user-token")
    if (localToken) {
      setToken(localToken)
    }
  }, [])

  const result = useQuery(ALL_PERSONS, {
    pollInterval: 60000,
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    )
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
      <Persons persons={result.data.allPersons} />
    </div>
  )
}

export default App
