import React from "react"
import NewNote from "./components/NewNote"
import Notes from "./components/Notes"
import VisibilityFilter from "./components/VisibilityFilter"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import noteService from "./services/notes"
import { setNotes } from "./reducers/noteReducer"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    noteService.getAll().then((notes) => dispatch(setNotes(notes)))
  }, [dispatch])

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}
export default App
