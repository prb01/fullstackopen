import { useState } from "react"
import { TextField, Button, Typography } from "@mui/material"

const Login = ({ handleLogin, setUsername, setPassword }) => (
  <form onSubmit={handleLogin} className="container-form">
    <div className="container-formfields">
      <TextField
        label="username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>

    <div className="container-formfields">
      <TextField
        label="password"
        type="password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>

    <Button variant="contained" type="submit">
      Login
    </Button>
  </form>
)

const AddBlog = ({ addBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleAddBlog = (e) => {
    e.preventDefault()

    addBlog({ title, author, url })
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <form onSubmit={handleAddBlog} className="container-form">
      <Typography variant="h4">Add New Blog</Typography>
      <div className="container-formfields">
        <TextField
          label="title"
          onChange={({ target }) => setTitle(target.value)}
          value={title}
        />
      </div>

      <div className="container-formfields">
        <TextField
          label="author"
          onChange={({ target }) => setAuthor(target.value)}
          value={author}
        />
      </div>

      <div className="container-formfields">
        <TextField
          label="url"
          onChange={({ target }) => setUrl(target.value)}
          value={url}
        />
      </div>

      <Button variant="contained" type="submit">
        Submit
      </Button>
    </form>
  )
}

const Forms = { Login, AddBlog }
export default Forms
