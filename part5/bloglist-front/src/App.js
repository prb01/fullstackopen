import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('user')
    if (loggedUser) {
      setUser(JSON.parse(loggedUser))
    }
  }, [])

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({username, password})
      
      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log("Error:", error.message)
    }
  }
  const handleLogout = e => {
    e.preventDefault()

    setUser(null)
    window.localStorage.removeItem('user')
  }

  return (
    <div>
      <h2>blogs</h2>
      {user === null ? (
        <div>
          <form onSubmit={handleLogin}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={({ target }) => setUsername(target.value)}
            />
            <br />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="setPassword"
              id="setPassword"
              onChange={({ target }) => setPassword(target.value)}
            />
            <br />

            <button>Login</button>
          </form>
        </div>
      ) : (
        <div>
          <span>
            <strong>{user.name}</strong> logged in
          </span>
          <button onClick={handleLogout}>logout</button>
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
