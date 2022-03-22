const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0

  return blogs.reduce((prev, curr) => {
    return prev + curr.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, curr) => {
    if(!prev) return curr

    const blog = curr.likes > prev.likes
    ? curr
    : prev

    return blog
  }, null)
}

const mostBlogs = (blogs) => {
  const blogCounts = {}
  blogs.forEach(blog => {
    blogCounts[blog.author] = blogCounts[blog.author] || 0
    blogCounts[blog.author] += 1
  })

  const blogCountsArr = Object.keys(blogCounts).map((author) => {
    return { author: author, blogs: blogCounts[author] }
  })

  return blogCountsArr.reduce((prev, curr) => {
    if (!prev) return curr

    const blog = curr.blogs > prev.blogs ? curr : prev

    return blog
  }, null)
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }
