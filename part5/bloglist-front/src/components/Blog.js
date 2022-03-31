const Blog = ({ blog }) => (
  <li>
    <strong>{blog.title}</strong> by {blog.author}
  </li>
)

export default Blog