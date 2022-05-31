import { Link, useNavigate } from "react-router-dom"
import { Typography, List, ListItem, Button } from "@mui/material"
import Comments from "./Comments"
import Togglable from "./Togglable"
import Forms from "./Forms"

const Blog = ({
  blog,
  updateBlog,
  removeBlog,
  addComment,
  user,
  toggleVisibilityRef,
}) => {
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

  const addCommentForm = () => {
    if (!user) return null

    return (
      <div>
        <Togglable buttonLabel="add comment" ref={toggleVisibilityRef}>
          <Forms.AddComment addComment={addComment} blogId={blog.id}/>
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <Typography variant="h5">{blog.title}</Typography>
      <List dense={true}>
        <ListItem>
          <a href={blog.url}>{blog.url}</a>
        </ListItem>
        <ListItem>{blog.likes} likes</ListItem>
        <ListItem>
          added by
          <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
        </ListItem>
        <ListItem>
          <Button variant="outlined" onClick={addLike}>
            like
          </Button>
          <Button onClick={handleRemove} style={toggleRemoveButton}>
            remove
          </Button>
        </ListItem>
      </List>
      <Typography variant="h6">Comments</Typography>
      {addCommentForm()}
      <Comments blog={blog} />
    </div>
  )
}

export default Blog
