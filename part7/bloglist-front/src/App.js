import { useState, useEffect, useRef } from "react"
import Blogs from "./components/Blogs"
import Forms from "./components/Forms"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import loginService from "./services/login"
import "./App.css"
import Togglable from "./components/Togglable"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "./reducers/notificationReducer"
import {
  createBlog,
  initializeBlogs,
  editBlog,
  deleteBlog,
} from "./reducers/blogsReducer"
import { setUser } from "./reducers/userReducer"
import { Routes, Route } from "react-router-dom"
import Users from "./components/Users"
// useParams,
// useNavigate,
// useMatch,

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const blogAddRef = useRef()
  const { user, blogs, notification } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("user")
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

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
      dispatch(setUser(user))
      dispatch(toast(`${user.username} logged in successfully`, "info", 5))

      setUsername("")
      setPassword("")
    } catch (error) {
      dispatch(toast(errorMsg(error), "error", 5))
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()

    dispatch(setUser(null))
    window.localStorage.removeItem("user")
  }

  const addBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      blogAddRef.current.toggleVisibility()

      dispatch(createBlog(returnedBlog))
      dispatch(
        toast(
          `a new blog ${newBlog.title} by ${newBlog.author} added`,
          "info",
          5
        )
      )
    } catch (error) {
      dispatch(toast(errorMsg(error), "error", 5))
    }
  }

  const updateBlog = async (updatedBlog, id) => {
    try {
      const returnedBlog = await blogService.update(updatedBlog, id)
      dispatch(editBlog({ id, returnedBlog }))
      dispatch(
        toast(
          `blog ${returnedBlog.title} by ${returnedBlog.author} updated`,
          "info",
          5
        )
      )
    } catch (error) {
      dispatch(toast(errorMsg(error), "error", 5))
    }
  }

  const removeBlog = async (blog, id) => {
    try {
      if (
        !window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)
      ) {
        return
      }

      await blogService.remove(id)

      dispatch(deleteBlog(id))
      dispatch(
        toast(`blog "${blog.title}" by ${blog.author} removed`, "info", 5)
      )
    } catch (error) {
      dispatch(toast(errorMsg(error), "error", 5))
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

      <Routes>
        <Route
          path="/"
          element={
            <Blogs
              blogs={blogs}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
              user={user}
            />
          }
        />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  )
}

export default App
