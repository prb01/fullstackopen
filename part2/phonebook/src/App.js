import { useState } from 'react'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '001-300-5467' }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

  const addNumber = e => {
    e.preventDefault()
    const nameObject = { name: newName, number: newNum }
    const idx = persons.findIndex(person => person.name === nameObject.name)
    
    if (idx > 0) {
      window.alert(`${nameObject.name} is already in the phonebook`)
      return
    }

    setPersons([...persons, nameObject])
    setNewName('')
    setNewNum('')
  }

  const handleNameChange = e => {
    setNewName(e.target.value)
  }
  const handleNumChange = e => {
    setNewNum(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNum} onChange={handleNumChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  )
}

export default App