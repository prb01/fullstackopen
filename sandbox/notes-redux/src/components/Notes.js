import { useSelector, useDispatch } from "react-redux"
import { toggleImportanceOf } from '../reducers/noteReducer'

const Notes = (props) => {
  const notes = useSelector((state) => state)
  const dispatch = useDispatch()

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