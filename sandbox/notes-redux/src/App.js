import React from "react"
import NewNote from "./components/NewNote"
import Notes from "./components/Notes"
import VisibilityFilter from "./components/VisibilityFilter"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { initializeNotes } from "./reducers/noteReducer"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeNotes())
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
