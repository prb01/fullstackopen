import { useState, useEffect } from 'react'
import axios from 'axios'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
      })
  }
  useEffect(hook, [])

  const addNumber = e => {
    e.preventDefault()
    const nameObject = { name: newName, number: newNum }
    const idx = persons.findIndex(person => person.name.toLowerCase() === nameObject.name.toLowerCase())

    if (idx >= 0) {
      const person = persons[idx]
      const id = person.id
      axios
        .put(`http://localhost:3001/persons/${id}`, nameObject)
        .then(res => {
          setPersons(persons.map(person => person.id !== id ? person : res.data))
        })
    } else {
      axios
        .post('http://localhost:3001/persons', nameObject)
        .then(res => {
          setPersons([...persons, res.data])
        })
    }

    setNewName('')
    setNewNum('')
  }

  const personsToShow = () => {
    if (newSearch === '') {
      return persons
    }

    return persons.filter(person => 
      person.name.toLowerCase().includes(newSearch.toLowerCase())
      )
  }

  const handleNameChange = e => setNewName(e.target.value)
  const handleNumChange = e => setNewNum(e.target.value)
  const handleSearchChange = e => setNewSearch(e.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearch} onChange={handleSearchChange} />

      <h3>Add New</h3>
      <PersonForm 
        onSubmit={addNumber} 
        name={newName}
        nameChange={handleNameChange}
        num={newNum}
        numChange={handleNumChange} />

      <h2>Numbers</h2>
      <Numbers persons={personsToShow()} />
    </div>
  )
}

export default App