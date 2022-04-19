// import { useDispatch } from "react-redux"
import { createNote } from "../reducers/noteReducer"
import { connect } from "react-redux"

const NewNote = props => {
  // const dispatch = useDispatch()

  const addNote = async (e) => {
    e.preventDefault()
    const content = e.target.note.value
    e.target.note.value = ""
    props.createNote(content)
  }

  return (
  <form onSubmit={addNote}>
    <input name="note" />
    <button type="submit">add</button>
  </form>
  )
}

// export default NewNote
export default connect(
  null,
  { createNote }
)(NewNote)