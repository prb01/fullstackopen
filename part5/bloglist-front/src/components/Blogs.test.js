import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import Blogs from "./Blogs"

describe("<Blogs/>", () => {
  test("renders only title & author on initialization", () => {
    const blogs = [{
      title: "Blog title",
      author: "Bloggy",
      url: "http://www.blog.com",
      likes: 9999,
      id: "dsf987"
    }]

    const { container } = render(<Blogs blogs={blogs} />)

    const collapsed = container.querySelector(".collapsed")
    const expanded = container.querySelector(".expanded")

    expect(collapsed).toHaveTextContent("Blog title")
    expect(collapsed).toHaveTextContent("Bloggy")
    expect(collapsed).not.toHaveTextContent("http://www.blog.com")
    expect(collapsed).not.toHaveTextContent("9999")
    
    expect(expanded).toHaveStyle("display: none")
  })
})
