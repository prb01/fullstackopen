import { useSelector, useDispatch } from "react-redux"
import { toggleImportanceOf } from '../reducers/noteReducer'

const Notes = (props) => {
  const dispatch = useDispatch()
  const notes = useSelector(({ filter, notes}) => {
    if (filter === "ALL") {
      return notes
    }
    return filter === "IMPORTANT"
    ? notes.filter(note => note.important)
    : notes.filter(note => !note.important)
  })

  return (
    <ul>
      {notes.map((note) => (
        <Note key={note.id} note={note} handleClick={() => dispatch(toggleImportanceOf(note.id))}/>
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

export default Notes