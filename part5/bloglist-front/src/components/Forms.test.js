import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Forms from "./Forms"

describe("<Forms.AddBlog />", () => {
  const blog = {
    title: "Blog title",
    author: "Bloggy",
    url: "http://www.blog.com",
    likes: 9999,
    id: "dsf987",
  }

  test("when submit is clicked, calls function and submits correct props", async () => {
    const mockAddBlog = jest.fn()

    const { container } = render(<Forms.AddBlog addBlog={mockAddBlog} />)

    const title = container.querySelector("#title")
    const author = container.querySelector("#author")
    const url = container.querySelector("#url")
    const submit = screen.getByText("Submit")

    await userEvent.type(title, blog.title)
    await userEvent.type(author, blog.author)
    await userEvent.type(url, blog.url)
    await userEvent.click(submit)

    expect(mockAddBlog.mock.calls).toHaveLength(1)
    expect(mockAddBlog.mock.calls[0][0].title).toBe(blog.title)
    expect(mockAddBlog.mock.calls[0][0].author).toBe(blog.author)
    expect(mockAddBlog.mock.calls[0][0].url).toBe(blog.url)
  })
})
