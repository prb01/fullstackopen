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
