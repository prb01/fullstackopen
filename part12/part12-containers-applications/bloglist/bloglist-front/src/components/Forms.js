import { useState } from "react"
import { TextField, Button } from "@mui/material"

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

const AddComment = ({ addComment, blogId }) => {
  const [content, setContent] = useState("")

  const handleAddComment = (event) => {
    event.preventDefault()

    addComment({ content }, blogId)
    setContent("")
  }

  return (
    <form onSubmit={handleAddComment} className="container-form">
      <div className="container-formfields">
        <TextField
          label="comment"
          onChange={({ target }) => setContent(target.value)}
          value={content}
        />
      </div>
      <Button variant="contained" type="submit">
        Add Comment
      </Button>
    </form>
  )
}

const Forms = { Login, AddBlog, AddComment }
export default Forms
