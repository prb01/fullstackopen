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

module.exports = { dummy, totalLikes, favoriteBlog }
