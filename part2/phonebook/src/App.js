import { useState, useEffect } from 'react'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const handleNameChange = e => setNewName(e.target.value)
  const handleNumChange = e => setNewNum(e.target.value)
  const handleSearchChange = e => setNewSearch(e.target.value)

  const pullPersons = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }
  useEffect(pullPersons, [])

  const handleSubmitPerson = e => {
    e.preventDefault()
    const personObject = { name: newName, number: newNum }
    const idx = persons.findIndex(person => person.name.toLowerCase() === personObject.name.toLowerCase())

    if (idx >= 0) {
      const id = persons[idx].id
      editNumber(id, personObject)
    } else {
      addNumber(personObject)
    }
  }

  const addNumber = personObject => {
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons([...persons, returnedPerson])
        clearForm()
      })
  }

  const editNumber = (id, personObject) => {
    personService
      .update(id, personObject)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        clearForm()
      })
  }

  const clearForm = () => {
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearch} onChange={handleSearchChange} />

      <h3>Add New</h3>
      <PersonForm 
        onSubmit={handleSubmitPerson} 
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