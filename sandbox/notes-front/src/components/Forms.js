import { useState } from "react"
import PropTypes from 'prop-types'

const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    loginUser({
      username,
      password,
    })
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="form_username">username</label>
        <input
          type="text"
          value={username}
          name="Username"
          id="form_username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="form_password">password</label>
        <input
          type="password"
          value={password}
          name="Password"
          id="form_password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired, 
}

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState("")

  const handleNoteChange = (e) => setNewNote(e.target.value)

  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: Math.random() > 0.5,
      date: new Date().toISOString(),
    })

    setNewNote("")
  }

  return (
    <div>
      <h2>Add new note</h2>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
          placeholder="write note here.."
          id="note-content"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default { LoginForm, NoteForm }
