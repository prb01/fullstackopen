import { Link } from "react-router-dom"

const Blogs = ({ blogs }) => (
  <div>
    <ul>
      {[...blogs]
        .sort((a, b) => a.likes < b.likes)
        .map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </li>
        ))}
    </ul>
  </div>
)

export default Blogs