import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

function getAll() {
  return (
    axios
      .get(baseURL)
      .then(res => res.data)
  )
}

function create(personObject) {
  return (
    axios
      .post(baseURL, personObject)
      .then(res => res.data)
  )
}

function update(id, personObject) {
  return (
    axios
      .put(`${baseURL}/${id}`, personObject)
      .then(res => res.data)
  )
}

const personService = { getAll, create, update }
export default personService