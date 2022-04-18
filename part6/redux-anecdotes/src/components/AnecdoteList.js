import { useSelector, useDispatch } from 'react-redux'
import { addVote } from "../reducers/anecdoteReducer"

const AnecdoteList = props => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  const byVotes = (a, b) => a.votes < b.votes

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
  }

  console.log(anecdotes)

  return (
    <>
      {anecdotes.sort(byVotes).map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote.id)}
        />
      ))}
    </>
  )
}

const Anecdote = ( { anecdote, handleClick } ) => {
  return (
    <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={handleClick}>vote</button>
        </div>
    </div>
  )
}

export default AnecdoteList