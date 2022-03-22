const listHelper = require("../utils/list_helper")

test("dummy returns one", () => {
  const blogs = []

  expect(listHelper.dummy(blogs)).toBe(1)
})

describe("total likes", () => {
  test("is 0 for empty blogs", () => {
    const blogs = []

    expect(listHelper.totalLikes(blogs)).toBe(0)
  })

  test("when blogs contains 1 list shows # of likes for that", () => {
    const blogs = [{ likes: 3 }]

    expect(listHelper.totalLikes(blogs)).toBe(3)
  })

  test("when blogs contains multiple lists, show sum of likes", () => {
    const blogs = [
      { likes: 2 },
      { likes: 2 },
      { likes: 2 },
      { likes: 2 },
      { likes: 2 },
    ]

    expect(listHelper.totalLikes(blogs)).toBe(10)
  })
})

describe("favorite blog", () => {
  test("returns null if blogs is empty", () => {
    const blogs = []
    expect(listHelper.favoriteBlog(blogs)).toBe(null)
  })

  test("returns blog if only 1 present", () => {
    const blogs = [{ title: "test", author: "test", url: "test.com", likes: 3 }]

    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[0])
  })

  test("returns blog with most likes if multiple blogs", () => {
    const blogs = [
      { title: "test1", author: "test1", url: "test.com", likes: 3 },
      { title: "test2", author: "test2", url: "test.com", likes: 4 },
      { title: "test3", author: "test3", url: "test.com", likes: 5 },
      { title: "test4", author: "test4", url: "test.com", likes: 3 },
      { title: "test5", author: "test5", url: "test.com", likes: 1 },
    ]

    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2])
  })

  test("returns FIRST blog with most likes if multiple blogs with same amount of likes", () => {
    const blogs = [
      { title: "test1", author: "test1", url: "test.com", likes: 3 },
      { title: "test2", author: "test2", url: "test.com", likes: 4 },
      { title: "test3", author: "test3", url: "test.com", likes: 5 },
      { title: "test4", author: "test4", url: "test.com", likes: 5 },
      { title: "test5", author: "test5", url: "test.com", likes: 1 },
    ]

    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2])
  })
})

describe("most blogs", () => {
  test("returns null if blogs is empty", () => {
    const blogs = []
    expect(listHelper.mostBlogs(blogs)).toBe(null)
  })

  test("returns author & num of blogs if only 1 blog", () => {
    const blogs = [{ title: "test", author: "test", url: "test.com", likes: 3 }]
    const expected = { author: "test", blogs: 1 }

    expect(listHelper.mostBlogs(blogs)).toEqual(expected)
  })

  test("returns author with most blogs in large list", () => {
    const blogs = [
      { title: "test1", author: "test1", url: "test.com", likes: 3 },
      { title: "test2", author: "test2", url: "test.com", likes: 4 },
      { title: "test3", author: "Batman", url: "test.com", likes: 2 },
      { title: "test4", author: "Batman", url: "test.com", likes: 2 },
      { title: "test5", author: "test5", url: "test.com", likes: 1 },
    ]
    const expected = { author: "Batman", blogs: 2 }

    expect(listHelper.mostBlogs(blogs)).toEqual(expected)
  })

  test("returns FIRST author with most blogs if multiple with same amount", () => {
    const blogs = [
      { title: "test1", author: "Roger Federer", url: "test.com", likes: 2 },
      { title: "test2", author: "Roger Federer", url: "test.com", likes: 1 },
      { title: "test3", author: "Batman", url: "test.com", likes: 5 },
      { title: "test4", author: "Batman", url: "test.com", likes: 5 },
      { title: "test5", author: "test5", url: "test.com", likes: 1 },
    ]
    const expected = { author: "Roger Federer", blogs: 2 }

    expect(listHelper.mostBlogs(blogs)).toEqual(expected)
  })
})

describe("most likes", () => {
  test("returns null if blogs is empty", () => {
    const blogs = []
    expect(listHelper.mostLikes(blogs)).toBe(null)
  })

  test("returns author & num of likes if only 1 blog", () => {
    const blogs = [{ title: "test", author: "test", url: "test.com", likes: 3 }]
    const expected = { author: "test", likes: 3 }

    expect(listHelper.mostLikes(blogs)).toEqual(expected)
  })

  test("returns author with most likes in large list", () => {
    const blogs = [
      { title: "test1", author: "test", url: "test.com", likes: 1 },
      { title: "test2", author: "test", url: "test.com", likes: 1 },
      { title: "test3", author: "Batman", url: "test.com", likes: 2 },
      { title: "test4", author: "Batman", url: "test.com", likes: 3 },
      { title: "test5", author: "test5", url: "test.com", likes: 1 },
    ]
    const expected = { author: "Batman", likes: 5 }

    expect(listHelper.mostLikes(blogs)).toEqual(expected)
  })

  test("returns FIRST author with most likes if multiple with same amount", () => {
    const blogs = [
      { title: "test1", author: "Roger Federer", url: "test.com", likes: 10 },
      { title: "test2", author: "Roger Federer", url: "test.com", likes: 10 },
      { title: "test3", author: "Batman", url: "test.com", likes: 19 },
      { title: "test4", author: "Batman", url: "test.com", likes: 1 },
      { title: "test5", author: "test5", url: "test.com", likes: 20 },
    ]
    const expected = { author: "Roger Federer", likes: 20 }

    expect(listHelper.mostLikes(blogs)).toEqual(expected)
  })
})