import { Link, useNavigate } from "react-router-dom"

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const navigate = useNavigate()
  if (!blog) return null

  const sessionUsername = user?.id || null
  const blogUsername = blog.user?.id || null
  const toggleRemoveButton = {
    display: sessionUsername === blogUsername ? "" : "none",
  }

  const addLike = async (e) => {
    e.preventDefault()

    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlog(updatedBlog, updatedBlog.id)
  }

  const handleRemove = async (e) => {
    e.preventDefault()

    removeBlog(blog, blog.id)
    navigate("/")
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <p>
        {blog.likes} likes <button onClick={addLike}>like</button>
      </p>
      <p>
        added by
        <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
      </p>
      <button onClick={handleRemove} style={toggleRemoveButton}>
        remove
      </button>
    </div>
  )
}

export default Blog