import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blogs from "./Blogs"

describe("<Blog/>", () => {
  let blogs

  beforeEach(() => {
    blogs = [
      {
        title: "Blog title",
        author: "Bloggy",
        url: "http://www.blog.com",
        likes: 9999,
        id: "dsf987",
      },
    ]
  })

  test("renders only title & author on initialization", () => {
    const { container } = render(<Blogs blogs={blogs} />)

    const collapsed = container.querySelector(".collapsed")
    const expanded = container.querySelector(".expanded")

    expect(collapsed).toHaveTextContent("Blog title")
    expect(collapsed).toHaveTextContent("Bloggy")
    expect(collapsed).not.toHaveTextContent("http://www.blog.com")
    expect(collapsed).not.toHaveTextContent("9999")

    expect(collapsed).not.toHaveStyle("display: none")
    expect(expanded).toHaveStyle("display: none")
  })

  test("renders title, author, url, likes on expand", async () => {
    const { container } = render(<Blogs blogs={blogs} />)

    const collapsed = container.querySelector(".collapsed")
    const expanded = container.querySelector(".expanded")
    const viewButton = screen.getByText("view")

    await userEvent.click(viewButton)

    expect(expanded).toHaveTextContent("Blog title")
    expect(expanded).toHaveTextContent("Bloggy")
    expect(expanded).toHaveTextContent("http://www.blog.com")
    expect(expanded).toHaveTextContent("9999")

    expect(collapsed).toHaveStyle("display: none")
    expect(expanded).not.toHaveStyle("display: none")
  })

  test("clicking like button twice, calls like handler twice", async () => {
    const mockLikeHandler = jest.fn()
    
    render(<Blogs blogs={blogs} updateBlog={mockLikeHandler}/>)
    
    const viewButton = screen.getByText("view")
    const likeButton = screen.getByText("like")

    await userEvent.click(viewButton)

    await userEvent.click(likeButton)
    await userEvent.click(likeButton)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})
