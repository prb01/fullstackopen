import { Link } from "react-router-dom"
import Togglable from "./Togglable"
import Forms from "./Forms"
import { List, ListItem, Typography } from "@mui/material"

const Blogs = ({ blogs, user, addBlog, toggleVisibilityRef }) => {
  const addBlogForm = () => {
    if (!user) return null

    return (
      <div>
        <Togglable buttonLabel="add blog" ref={toggleVisibilityRef}>
          <Forms.AddBlog addBlog={addBlog} />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <Typography variant="h4">Blogs</Typography>
      {addBlogForm()}
      <List dense={true}>
        {[...blogs]
          .sort((a, b) => a.likes < b.likes)
          .map((blog) => (
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

export default Blogs
