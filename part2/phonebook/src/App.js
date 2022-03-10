import { useState } from 'react'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '001-300-5467' },
    { name: 'Caro Duque', number: '+54-001-4567' },
    { name: 'Denny Maliakla', number: '+41 41 750 55 78' }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const addNumber = e => {
    e.preventDefault()
    const nameObject = { name: newName, number: newNum }
    const idx = persons.findIndex(person => person.name.toLowerCase() === nameObject.name.toLowerCase())
    const personsCopy = [...persons]

    if (idx > 0) {
      personsCopy[idx].number = newNum
    } else {
      setPersons([...personsCopy, nameObject])
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