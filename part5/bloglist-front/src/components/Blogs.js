import { useState } from "react"
import blogService from "../services/blogs"

const Blogs = ({ blogs, updateBlog, removeBlog, user }) => (
  <div>
    <ul>
      {blogs
        .sort((a, b) => a.likes < b.likes)
        .map((blog) => (
          <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
          user={user}
          />
        ))}
    </ul>
  </div>
)

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [fullView, setFullView] = useState(false)

  const sessionUsername = user?.username || null
  const blogUsername = blog.user?.username || null

  const showWhenSmallView = { display: fullView ? "none" : "" }
  const showWhenFullView = { display: fullView ? "" : "none" }
  const toggleRemoveButton = {
    display: sessionUsername === blogUsername ? "" : "none",
  }

  const toggleView = () => {
    setFullView(!fullView)
  }

  const addLike = async (e) => {
    e.preventDefault()

    const updatedBlog = { ...blog, likes: ++blog.likes }
    updateBlog(updatedBlog, updatedBlog.id)
  }

  const handleRemove = async (e) => {
    e.preventDefault()

    removeBlog(blog, blog.id)
  }

  return (
    <>
      <li style={showWhenSmallView}>
        <strong>{blog.title}</strong> by {blog.author}
        <button onClick={toggleView}>view</button>
      </li>

      <li style={showWhenFullView}>
        <strong>{blog.title}</strong> by {blog.author}
        <button onClick={toggleView}>hide</button>
        <ul>
          <li>url: {blog.url}</li>
          <li>
            likes: {blog.likes}
            <button onClick={addLike}>like</button>
          </li>
          <li>user: {blog.user?.name || "user unknown"}</li>

          <button onClick={handleRemove} style={toggleRemoveButton}>
            remove
          </button>
        </ul>
      </li>
    </>
  )
}

export default Blogs
