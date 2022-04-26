import { useSelector } from "react-redux"

const User = ({ id }) => {
  const users = useSelector((state) => state.users.users)
  const user = users.find((user) => (user.id === id))

  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs:</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title} by {blog.author}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
