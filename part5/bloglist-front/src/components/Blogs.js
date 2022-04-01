const Blogs = ({ blogs }) => (
  <div>
    <ul>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </ul>
  </div>
)

const Blog = ({ blog }) => (
  <li>
    <strong>{blog.title}</strong> by {blog.author}
  </li>
)

export default Blogs
