import { useState, useEffect, useRef } from "react"
import Blogs from "./components/Blogs"
import Blog from "./components/Blog"
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
import { initializeUsers, setUser } from "./reducers/userReducer"
import { Routes, Route, useMatch } from "react-router-dom"
import Users from "./components/Users"
import User from "./components/User"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const blogAddRef = useRef()
  const { users, blogs, notification } = useSelector((state) => state)
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

  useEffect(() => {
    // userService.getAll().then((users) => dispatch(setUsers(users)))
    dispatch(initializeUsers())
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

      dispatch(createBlog([returnedBlog, users.currentUser]))
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
      dispatch(editBlog([returnedBlog, users.currentUser]))
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
        <strong>{users.currentUser.name}</strong> logged in
      </span>
      <button onClick={handleLogout}>logout</button>
    </div>
  )

  const userMatch = useMatch("/users/:id")
  const user = userMatch ? users.users.find(u => u.id === userMatch.params.id) : null

  const blogMatch = useMatch("/blogs/:id")
  const blog = blogMatch ? blogs.find(b => b.id === blogMatch.params.id) : null

  return (
    <div>
      <Notification notification={notification} />

      <h1>blogs</h1>

      {users.currentUser === null ? (
        loginForm()
      ) : (
        <>
          {loggedIn()}
          {addBlogForm()}
        </>
      )}

      <Routes>
        <Route path="/users/:id" element={<User user={user} blogs={blogs} />} />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blog={blog}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
              user={users.currentUser}
            />
          }
        />
        <Route path="/" element={<Blogs blogs={blogs} />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  )
}

export default App
