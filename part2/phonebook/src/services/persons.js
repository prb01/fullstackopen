import axios from 'axios'

const baseURL = "https://peaceful-garden-83193.herokuapp.com/api/persons"

const getAll = () => (
  axios
    .get(baseURL)
    .then(res => res.data)
)

const create = personObject => (
  axios
    .post(baseURL, personObject)
    .then(res => res.data)
)

const update = (id, personObject) => (
  axios
    .put(`${baseURL}/${id}`, personObject)
    .then(res => res.data)
)

const deletePerson = id => (
  axios
    .delete(`${baseURL}/${id}`)
)

const personService = { getAll, create, update, deletePerson }
export default personService