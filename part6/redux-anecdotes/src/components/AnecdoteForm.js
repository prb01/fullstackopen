// import { useDispatch } from "react-redux"
import { connect } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch()

  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ""
    // dispatch(createAnecdote(content))
    // dispatch(setNotification(`Anecdote: "${content}" added`, 5))
    props.createAnecdote(content)
    props.setNotification(`Anecdote: "${content}" added`, 5)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

// export default AnecdoteForm

export default connect(
  null,
  { createAnecdote, setNotification }
)(AnecdoteForm)