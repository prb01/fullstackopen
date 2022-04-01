import { useState } from "react"

const Blogs = ({ blogs }) => (
  <div>
    <ul>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </ul>
  </div>
)

const Blog = ({ blog }) => {
  const [fullView, setFullView] = useState(false)

  const showWhenSmallView = { display: fullView ? "none" : "" }
  const showWhenFullView = { display: fullView ? "" : "none" }

  const toggleView = () => {
    setFullView(!fullView)
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
            <button onClick={() => console.log("like++")}>like</button>
          </li>
          <li>user: {blog.user?.name || "user unknown"}</li>
        </ul>
      </li>
    </>
  )
}

export default Blogs
