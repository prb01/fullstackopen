import { useDispatch } from "react-redux"
import { createNote } from "../reducers/noteReducer"

const NewNote = props => {
  const dispatch = useDispatch()

  const addNote = (e) => {
    e.preventDefault()
    const content = e.target.note.value
    e.target.note.value = ""
    dispatch(createNote(content))
  }

  return (
  <form onSubmit={addNote}>
    <input name="note" />
    <button type="submit">add</button>
  </form>
  )
}

export default NewNote