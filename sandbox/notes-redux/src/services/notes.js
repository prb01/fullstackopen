import axios from "axios"

const baseUrl = "http://localhost:3001/notes"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const noteToAdd = {
    content,
    important: false,
  }
  const response = await axios.post(baseUrl, noteToAdd)
  return response.data
}

const toggleImportance = async (id) => {
  const noteResponse = await axios.get(`${baseUrl}/${id}`)
  const note = noteResponse.data
  const response = await axios.put(`${baseUrl}/${id}`, {
    ...note,
    important: !note.important,
  })
  return response.data
}

const noteService = { getAll, createNew, toggleImportance }
export default noteService
