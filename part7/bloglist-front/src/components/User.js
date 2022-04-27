import { Link } from "react-router-dom"
import { Typography, List, ListItem } from "@mui/material"

const User = ({ user, blogs }) => {
  if (!user) return null

  const userBlogs = blogs.filter((b) => b.user.id === user.id)

  return (
    <div>
      <Typography variant="h4">{user.name}</Typography>
      <Typography variant="h5">added blogs:</Typography>
      <List dense={true}>
        {userBlogs.map((blog) => (
          <ListItem key={blog.id} divider={true}>
            <Typography>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} by {blog.author}
              </Link>
            </Typography>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default User
