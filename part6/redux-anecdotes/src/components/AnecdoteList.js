import { useSelector, useDispatch } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import {
  createNotification,
  removeNotification,
} from "../reducers/notificationReducer"

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const byVotes = (a, b) => a.votes < b.votes
  const anecdotes = useSelector((state) => {
    if (state.filter === "") return state.anecdotes

    return state.anecdotes.filter((a) =>
      a.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  })

  const vote = (id) => {
    console.log("vote", id)
    dispatch(addVote(id))
    dispatch(createNotification(`voted for ${id}`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  console.log(anecdotes)

  return (
    <>
      {anecdotes
        .slice()
        .sort(byVotes)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => vote(anecdote.id)}
          />
        ))}
    </>
  )
}

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

export default AnecdoteList
