import { useState } from 'react'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addName = e => {
    e.preventDefault()
    const nameObject = { name: newName }

    if (persons.some( person => person.name === nameObject.name)) {
      window.alert(`${nameObject.name} is already in the phonebook`)
      return
    }

    setPersons([...persons, nameObject])
    setNewName('')
  }

  const handleNameChange = e => {
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
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