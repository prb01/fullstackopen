const noteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_NOTE":
      return [...state, action.data]
    case "TOGGLE_IMPORTANCE":
      console.log(`toggled`)
      const id = action.data.id
      const noteToChange = state.find((n) => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      }

      return state.map((note) => (note.id === id ? changedNote : note))
    default:
      return state
  }
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export const createNote = (content) => ({
  type: "NEW_NOTE",
  data: {
    content,
    important: false,
    id: generateId(),
  },
})

export const toggleImportanceOf = (id) => ({
  type: "TOGGLE_IMPORTANCE",
  data: { id },
})

export default noteReducer
