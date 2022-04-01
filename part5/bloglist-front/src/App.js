import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Forms from "./components/Forms"
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

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem("user", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (error) {
      console.log("Error:", error.message)
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
      setTitle("")
      setAuthor("")
      setUrl("")
    } catch (error) {
      console.log("Error:", error.message)
    }
  }

  return (
    <div>
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
