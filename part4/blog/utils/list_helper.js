const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0

  return blogs.reduce((prev, curr) => {
    console.log(typeof curr.likes)
    return prev + curr.likes
  }, 0)
}

module.exports = { dummy, totalLikes }
