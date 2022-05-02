import { useQuery } from "@apollo/client"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import { ALL_PERSONS } from "./queries"
import { useState } from "react"
import Notify from "./components/Notify"
import PhoneForm from "./components/PhoneForm"

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  const result = useQuery(ALL_PERSONS, {
    pollInterval: 60000,
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
      <Persons persons={result.data.allPersons} />
    </div>
  )
}

export default App
