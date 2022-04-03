import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Togglable from "./Togglable"

describe("<Togglable />", () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv">togglable content</div>
      </Togglable>
    ).container
  })

  test("renders its children", () => {
    screen.getAllByText("togglable content")
  })

  test("at start the children are not displayed", () => {
    const div = container.querySelector(".togglableContent")
    expect(div).toHaveStyle("display: none")
  })

  test("after clicking the button, children are displayed", async () => {
    const button = screen.getByText("show...")
    await userEvent.click(button)

    const div = container.querySelector(".togglableContent")
    expect(div).not.toHaveStyle("display: none")
  })

  test("toggled content can be closed", async () => {
    const button = screen.getByText("show...")
    await userEvent.click(button)

    const closeButton = screen.getByText("cancel")
    await userEvent.click(closeButton)

    const div = container.querySelector(".togglableContent")
    expect(div).toHaveStyle("display: none")
  })
})