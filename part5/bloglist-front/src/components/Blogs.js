import { useState } from "react"
import blogService from "../services/blogs"

const Blogs = ({ blogs }) => (
  <div>
    <ul>
      {blogs.sort((a,b) => a.likes < b.likes ).map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </ul>
  </div>
)

const Blog = ({ blog }) => {
  const [fullView, setFullView] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const showWhenSmallView = { display: fullView ? "none" : "" }
  const showWhenFullView = { display: fullView ? "" : "none" }

  const toggleView = () => {
    setFullView(!fullView)
  }

  const addLike = async (e) => {
    e.preventDefault()

    const updatedBlog = {...blog, likes: ++blog.likes }
    await blogService.update(updatedBlog, blog.id)
    setLikes(blog.likes)
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
            likes: {likes}
            <button onClick={addLike}>like</button>
          </li>
          <li>user: {blog.user?.name || "user unknown"}</li>
        </ul>
      </li>
    </>
  )
}

export default Blogs
