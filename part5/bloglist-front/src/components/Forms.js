import { useState } from "react"

const Login = ({ handleLogin, setUsername, setPassword }) => (
  <form onSubmit={handleLogin} className="container-form">
    <div className="container-formfields">
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>

    <div className="container-formfields">
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>

    <button>Login</button>
  </form>
)

const AddBlog = ({ addBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleAddBlog = (e) => {
    e.preventDefault()

    addBlog({ title, author, url })
  }

  return (
    <form onSubmit={handleAddBlog} className="container-form">
      <div className="container-formfields">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={({ target }) => setTitle(target.value)}
          value={title}
        />
      </div>

      <div className="container-formfields">
        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          id="author"
          onChange={({ target }) => setAuthor(target.value)}
          value={author}
        />
      </div>

      <div className="container-formfields">
        <label htmlFor="url">url</label>
        <input
          type="url"
          name="url"
          id="url"
          onChange={({ target }) => setUrl(target.value)}
          value={url}
        />
      </div>

      <button>Submit</button>
    </form>
  )
}

const Forms = { Login, AddBlog }
export default Forms