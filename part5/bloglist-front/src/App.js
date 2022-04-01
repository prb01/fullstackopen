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

  const addBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      blogAddRef.current.toggleVisibility()

      setBlogs(blogs.concat(returnedBlog))
      toast(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        "info",
        5000
      )
    } catch (error) {
      toast(errorMsg(error), "error", 5000)
    }
  }

  const updateBlog = async (updatedBlog, id) => {
    try {
      const returnedBlog = await blogService.update(updatedBlog, id)

      setBlogs(blogs.map((blog) => (blog.id === id ? returnedBlog : blog)))
      toast(
        `blog ${returnedBlog.title} by ${returnedBlog.author} updated`,
        "info",
        5000
      )
    } catch (error) {
      toast(errorMsg(error), "error", 5000)
    }
  }

  const removeBlog = async (blog, id) => {
    try {
      if (!window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
        return
      }

      await blogService.remove(id)

      setBlogs(blogs.map((blog) => (blog.id === id ? "" : blog)))
      toast(`blog "${blog.title}" by ${blog.author} removed`, "info", 5000)
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
        <Forms.AddBlog addBlog={addBlog} />
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

      <Blogs
        blogs={blogs}
        updateBlog={updateBlog}
        removeBlog={removeBlog}
        user={user}
      />
    </div>
  )
}

export default App
