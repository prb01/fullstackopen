import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Forms from "./Forms"
import userEvent from "@testing-library/user-event"

test("<Forms.NoteForm /> updates parent state and calls onSubmit", async () => {
  const createNote = jest.fn()

  const { container } = render(<Forms.NoteForm createNote={createNote} />)

  const input = container.querySelector("#note-content")
  const sendButton = screen.getByText("Save")
  
  await userEvent.type(input, "testing a form...")
  await userEvent.click(sendButton)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe("testing a form...")
})
