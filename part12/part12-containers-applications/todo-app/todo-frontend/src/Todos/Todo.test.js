import { render } from "@testing-library/react"
import Todo from "./Todo"

describe("TODO", () => {
  it("creates a todo item with 'This todo is not done' by default", () => {
    const todo = { text: "task to do" }
    const onClickDelete = jest.fn()
    const onClickComplete = jest.fn()

    const { getByText } = render(
      <Todo
        todo={todo}
        onClickDelete={onClickDelete}
        onClickComplete={onClickComplete}
      />
    )

    expect(getByText("task to do")).toBeTruthy()
    expect(getByText("This todo is not done")).toBeTruthy()
  })
})
