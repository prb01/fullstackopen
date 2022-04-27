import { Link } from "react-router-dom"

const User = ({ user, blogs }) => {
  if (!user) return null

  const userBlogs = blogs.filter(b => b.user.id === user.id)

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs:</h3>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User
