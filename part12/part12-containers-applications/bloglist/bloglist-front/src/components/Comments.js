import { List, ListItem } from "@mui/material"

const Comments = ({ blog }) => {
  if (!blog.comments || blog.comments.length === 0) return null

  return (
    <List dense={true}>
      {blog.comments.map((comment) => (
        <ListItem key={comment.id}>{comment.content}</ListItem>
      ))}
    </List>
  )
}

export default Comments
