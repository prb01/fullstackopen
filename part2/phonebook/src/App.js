import { useState, useEffect } from 'react'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [msg, setMsg] = useState(null)
  const [status, setStatus] = useState(null)
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

        setMsg(`Added ${personObject.name}`)
        setStatus('success')
        setTimeout(() => {
          setMsg(null)
          setStatus(null)
        }, 4000)
      })
      .catch(error => {
        setMsg(error.response.data.error)
        setStatus("error")
        setTimeout(() => {
          setMsg(null)
          setStatus(null)
        }, 4000)

      })
  }

  const editNumber = (id, personObject) => {
    const person = persons.find(person => person.id === id)
    const msg = `Are you sure you want to update entry for '${person.name}'?`

    if (window.confirm(msg)) {
      personService
        .update(id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          clearForm()

          setMsg(`Updated ${personObject.name}`)
          setStatus('success')
          setTimeout(() => {
            setMsg(null)
            setStatus(null)
          }, 4000)
        })
        .catch(error => {
          setMsg(error.response.data.error)
          setStatus("error")
          setTimeout(() => {
            setMsg(null)
            setStatus(null)
          }, 4000)
        })
    }
  }

  const deleteNumber = id => {
    const person = persons.find(person => person.id === id)
    const msg = `Are you sure you want to delete '${person.name}'?`

    if (window.confirm(msg)) {
      personService
        .deletePerson(id)
        .then(res => {
          setPersons(persons.filter(person => person.id !== id))
          
          setMsg(`Deleted ${person.name}`)
          setStatus('success')
          setTimeout(() => {
            setMsg(null)
            setStatus(null)
          }, 4000)
        })
        .catch(reason => {
          setPersons(persons.filter(person => person.id !== id))
          setMsg(`Info for ${person.name} has already been removed`)
          setStatus('error')
          setTimeout(() => {
            setMsg(null)
            setStatus(null)
          }, 4000)
        })
    }
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

      <h3>Add/Update Number</h3>
      <Notification msg={msg} status={status}/>
      <PersonForm 
        onSubmit={handleSubmitPerson} 
        name={newName}
        nameChange={handleNameChange}
        num={newNum}
        numChange={handleNumChange} />

      <h2>Numbers</h2>
      <ul>
        <Numbers persons={personsToShow()} clickDelete={deleteNumber} />
      </ul>
    </div>
  )
}

export default App