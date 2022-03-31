import { useState, useEffect } from "react"
import Note from "./components/Note"
import Forms from "./components/Forms"
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
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const hook = () => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }
  useEffect(hook, [])

  const handleNoteChange = (e) => setNewNote(e.target.value)
  const handleLogin = async (e) => {
    e.preventDefault()
    console.log("logging in with", username, password)

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (error) {
      setErrorMsg('Incorrect credentials')
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    }
  }

  const addNote = (e) => {
    e.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
    noteService.create(noteObject).then((addedNote) => {
      setNotes(notes.concat(addedNote))
      setNewNote("")
    })
  }

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

      {user === null ? (
        <Forms.LoginForm 
          handleLogin = {handleLogin}
          username = {username}
          setUsername = {setUsername}
          password = {password}
          setPassword = {setPassword}
        />
      ) : (
        <Forms.NoteForm
          user = {user}
          addNote = {addNote}
          newNote = {newNote}
          handleNoteChange = {handleNoteChange}
        />
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
