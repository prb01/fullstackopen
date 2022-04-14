import { useState, useEffect, useRef } from "react"
import Note from "./components/Note"
import Forms from "./components/Forms"
import Togglable from "./components/Togglable"
import Notification from "./components/Notification"
import noteService from "./services/notes"
import loginService from "./services/login"

const Footer = () => {
  const footerStyle = {
    color: "rgb(12, 12, 141)",
    fontStyle: "italic",
    fontSize: 16,
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, made by PRB01</em>
    </div>
  )
}

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()

  const getInitialNotes = () => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }
  useEffect(getInitialNotes, [])

  const getUserFromLocalStorage = () => {
    const loggedUser = window.localStorage.getItem("user")
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      noteService.setToken(user.token)
    }
  }
  useEffect(getUserFromLocalStorage, [])

  const handleLogin = async ({ username, password }) => {
    console.log("logging in with", username, password)

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem("user", JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      noteFormRef.current.toggleVisibility()
    } catch (error) {
      setErrorMsg("Incorrect credentials")
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()

    window.localStorage.removeItem("user")
    noteService.setToken(null)
    setUser(null)
  }

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote))
    })
  }

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <Forms.LoginForm loginUser={handleLogin} />
    </Togglable>
  )

  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <Forms.NoteForm createNote={addNote} />
    </Togglable>
  )

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important)

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find((note) => note.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((updatedNote) => {
        setNotes(
          notes.map((note) => (note.id !== id ? note : updatedNote))
        )
      })
      .catch((error) => {
        setErrorMsg(
          `the note '${note.content}' was already deleted from server`
        )
        setNotes(notes.filter((n) => n.id !== id))
        setTimeout(() => {
          setErrorMsg(null)
        }, 5000)
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification msg={errorMsg} />

      {user === null ? loginForm() : noteForm()}

      {user !== null && (
        <div>
          <p>
            <strong>{user.name}</strong> logged in{" "}
          </p>
          <button onClick={handleLogout}>logout</button>
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>

      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>

      <Footer />
    </div>
  )
}

export default App
