import { useState, useEffect } from "react"
import { TextField, Button } from "@mui/material"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"

const LoginForm = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      window.alert(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem("library-user-token", token)
      setUsername("")
      setPassword("")
      setPage("authors")
    }
  }, [result.data])

  if (!show) return null

  const handleSubmit = (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            size="small"
            label="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          <TextField
            size="small"
            type="password"
            label="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
