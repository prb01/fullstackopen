// import { useSelector, useDispatch } from "react-redux"
import { toggleImportanceOf } from "../reducers/noteReducer"
// import noteService from "../services/notes"
import { connect } from "react-redux"

const Notes = (props) => {
  // const dispatch = useDispatch()

  // const notes = useSelector(({ filter, notes }) => {
  //   if (filter === "ALL") {
  //     return notes
  //   }
  //   return filter === "IMPORTANT"
  //     ? notes.filter((note) => note.important)
  //     : notes.filter((note) => !note.important)
  // })

  // const toggleImportance = async (id) => {
  //   await noteService.toggleImportance(id)
  //   dispatch(toggleImportanceOf(id))
  // }

  return (
    <ul>
      {props.notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => props.toggleImportanceOf(note.id)}
        />
      ))}
    </ul>
  )
}

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content} <strong>{note.important ? "important" : ""}</strong>
    </li>
  )
}

const mapStateToProps = (state) => {
  if (state.filter === "ALL") {
    return {
      notes: state.notes
    }
  }
  return {
    notes: state.filter === "IMPORTANT"
      ? state.notes.filter((note) => note.important)
      : state.notes.filter((note) => !note.important)
  }
}

const mapDispatchToProps = {
  toggleImportanceOf
}


// export default Notes
const ConnectedNotes = connect(
  mapStateToProps,
  mapDispatchToProps
  )(Notes)
export default ConnectedNotes
