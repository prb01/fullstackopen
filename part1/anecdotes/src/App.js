import './App.css';
import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState({0: 0})
  const topVote = Object.keys(votes).reduce((a, b) => {
    return votes[a] > votes[b] ? a : b
  })

  const handleVoteClick = () => {
    const newVotes = {...votes}
    newVotes[selected] = newVotes[selected] || 0
    newVotes[selected] += 1
    setVote(newVotes)
  }

  return (
    <div className="quote-container">
      <span className="quote-mark">"</span>
      <span className="quote-text large">{anecdotes[selected]}</span>
      <p>has {votes[selected]} votes</p>

      <div className="buttons">
        <button onClick={handleVoteClick}>Vote</button>
        <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>
          Next anecdote
        </button>
      </div>

      <div className="subquote-container">
        <h2>Top voted anecdote</h2>
        <span className="quote-text small">{anecdotes[topVote]}</span>
      </div>
    </div>
  )
}

export default App
