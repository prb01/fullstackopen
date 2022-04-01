import { useState, useEffect, useRef } from "react"
import Blogs from "./components/Blogs"
import Forms from "./components/Forms"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import loginService from "./services/login"
import "./App.css"
import Togglable from "./components/Togglable"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [notification, setNotification] = useState(null)
  const blogAddRef = useRef()

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

  const errorMsg = (error) =>
    `${error.response.status} ${error.response.statusText}: ${
      error.response.data?.error || error.message
    }`

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
      toast(errorMsg(error), "error", 5000)
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()

    setUser(null)
    window.localStorage.removeItem("user")
  }

  const handleAddBlog = async (e) => {
    e.preventDefault()

    const newBlog = { title, author, url }

    try {
      const returnedBlog = await blogService.create(newBlog)
      blogAddRef.current.toggleVisibility()

      setBlogs(blogs.concat(returnedBlog))
      toast(`a new blog ${title} by ${author} added`, "info", 5000)

      setTitle("")
      setAuthor("")
      setUrl("")
    } catch (error) {
      toast(errorMsg(error), "error", 5000)
    }
  }

  const loginForm = () => (
    <Forms.Login
      handleLogin={handleLogin}
      setUsername={setUsername}
      setPassword={setPassword}
    />
  )

  const addBlogForm = () => (
    <div>
      <Togglable buttonLabel="add blog" ref={blogAddRef}>
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
      </Togglable>
    </div>
  )

  const loggedIn = () => (
    <div>
      <span>
        <strong>{user.name}</strong> logged in
      </span>
      <button onClick={handleLogout}>logout</button>
    </div>
  )

  return (
    <div>
      <Notification notification={notification} />

      <h1>blogs</h1>

      {user === null ? (
        loginForm()
      ) : (
        <>
          {loggedIn()}
          {addBlogForm()}
        </>
      )}

      <Blogs blogs={blogs} />
    </div>
  )
}

export default App
