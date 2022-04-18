import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0,
      })
    },
    addVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(a => a.id !== id ? a : changedAnecdote)
    }
  }
})

// const anecdoteReducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)

//   switch (action.type) {
//     case "NEW_ANECDOTE":
//       return [...state, action.data]
//     case "ADD_VOTE":
//       const id = action.data.id
//       return state.map(a => a.id !== id ? a : {...a, votes: a.votes + 1} )  
//     default:
//       return state
//   }
// }

// export const addVote = id => (
//   {
//     type: "ADD_VOTE",
//     data: { id }
//   }
// )

// export const newAnecdote = content => (
//   {
//     type: "NEW_ANECDOTE",
//     data: {
//       content,
//       id: getId(),
//       votes: 0
//     }
//   }
// )

export const { createAnecdote, addVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer