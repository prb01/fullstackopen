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
