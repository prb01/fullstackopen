import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Forms from "./components/Forms"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import loginService from "./services/login"
import "./App.css"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("user")
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const toast = (msg, type, timeout) => {
    setNotification({ msg, type })
    setTimeout(() => {
      setNotification(null)
    }, timeout)
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem("user", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      toast(`${user.username} logged in successfully`, "info", 5000)

      setUsername("")
      setPassword("")
    } catch (error) {
      toast(
        `${error.response.status} ${error.response.statusText}: ${error.response.data?.error || error.message}`,
        "error",
        5000
      )
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()

    setUser(null)
    window.localStorage.removeItem("user")
  }

  const handleAddBlog = async (e) => {
    e.preventDefault()

    const newBlog = {
      title,
      author,
      url,
    }

    try {
      const returnedBlog = await blogService.create(newBlog)

      setBlogs(blogs.concat(returnedBlog))
      toast(`a new blog ${title} by ${author} added`, "info", 5000)

      setTitle("")
      setAuthor("")
      setUrl("")
    } catch (error) {
      toast(
        `${error.response.status} ${error.response.statusText}: ${
          error.response.data?.error || error.message
        }`,
        "error",
        5000
      )
    }
  }

  return (
    <div>
      <Notification notification={notification} />

      <h2>blogs</h2>
      {user === null ? (
        <Forms.Login
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        <div>
          <span>
            <strong>{user.name}</strong> logged in
          </span>
          <button onClick={handleLogout}>logout</button>
          <h2>Add new blog</h2>
          <Forms.AddBlog
            handleAddBlog={handleAddBlog}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
          />
          <ul>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
