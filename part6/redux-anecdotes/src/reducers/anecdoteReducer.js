import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
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
    },
    setAnecdotes(state, action) {
      return action.payload
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

export const { createAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer