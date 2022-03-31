const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => (
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

const NoteForm = ({ user, addNote, newNote, handleNoteChange }) => (
  <div>
    <p>
      <strong>{user.name}</strong> logged in{" "}
    </p>

    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange} />
      <button type="submit">Save</button>
    </form>
  </div>
)

export default { LoginForm, NoteForm }
