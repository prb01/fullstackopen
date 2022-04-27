import { useState, useEffect, useRef } from "react"
import Blogs from "./components/Blogs"
import Blog from "./components/Blog"
import Forms from "./components/Forms"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import loginService from "./services/login"
import "./App.css"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "./reducers/notificationReducer"
import {
  createBlog,
  initializeBlogs,
  editBlog,
  deleteBlog,
} from "./reducers/blogsReducer"
import { initializeUsers, setUser } from "./reducers/userReducer"
import {
  Routes,
  Route,
  Link,
  useMatch,
  useNavigate,
} from "react-router-dom"
import Users from "./components/Users"
import User from "./components/User"
import {
  Container,
  AppBar,
  Toolbar,
  Button,
  Box,
  Paper,
  Typography,
} from "@mui/material"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { users, blogs, notification } = useSelector((state) => state)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blogAddRef = useRef()

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
      dispatch(
        toast(`${user.username} logged in successfully`, "success", 5)
      )

      setUsername("")
      setPassword("")
      navigate("/")
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
          "success",
          5
        )
      )
    } catch (error) {
      dispatch(toast(errorMsg(error), "error", 5))
    }
  }

  const updateBlog = async (updatedBlog, id) => {
    try {
      const blog = blogs.find((b) => b.id === id)
      const returnedBlog = await blogService.update(updatedBlog, id)
      dispatch(editBlog([returnedBlog, blog.user]))
      dispatch(
        toast(
          `blog ${returnedBlog.title} by ${returnedBlog.author} updated`,
          "success",
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
        toast(`blog "${blog.title}" by ${blog.author} removed`, "success", 5)
      )
    } catch (error) {
      dispatch(toast(errorMsg(error), "error", 5))
    }
  }

  const loggedIn = () => (
    <Box>
      <Typography>
        <strong>{users.currentUser.name}</strong> logged in
        <Button
          color="inherit"
          variant="outlined"
          onClick={handleLogout}
          sx={{ marginLeft: 1, marginRight: 1 }}
        >
          Logout
        </Button>
      </Typography>
    </Box>
  )

  const userMatch = useMatch("/users/:id")
  const user = userMatch
    ? users.users.find((u) => u.id === userMatch.params.id)
    : null

  const blogMatch = useMatch("/blogs/:id")
  const blog = blogMatch
    ? blogs.find((b) => b.id === blogMatch.params.id)
    : null

  return (
    <Container>
      <Notification notification={notification} />

      <AppBar position="static">
        <Toolbar disableGutters>
          <Box display="flex" flexGrow={1}>
            <Button color="inherit" component={Link} to="/">
              Blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              Users
            </Button>
          </Box>
          {users.currentUser === null ? (
            <Button
              color="inherit"
              variant="outlined"
              component={Link}
              to="/login"
              sx={{ marginLeft: 1, marginRight: 1 }}
            >
              Login
            </Button>
          ) : (
            <>{loggedIn()}</>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ marginTop: 2, padding: 2 }} component={Paper}>
        <Routes>
          <Route
            path="/users/:id"
            element={<User user={user} blogs={blogs} />}
          />
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
          <Route
            path="/"
            element={
              <Blogs
                blogs={blogs}
                user={users.currentUser}
                addBlog={addBlog}
                blogAddRef={blogAddRef}
              />
            }
          />
          <Route path="/users" element={<Users />} />
          <Route
            path="/login"
            element={
              <Forms.Login
                handleLogin={handleLogin}
                setUsername={setUsername}
                setPassword={setPassword}
              />
            }
          />
        </Routes>
      </Box>
    </Container>
  )
}

export default App
