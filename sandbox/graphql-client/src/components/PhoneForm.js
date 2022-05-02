import { useMutation } from "@apollo/client"
import { EDIT_NUMBER } from "../queries"
import { useState, useEffect } from "react"

const PhoneForm = ({ setError }) => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [changeNumber, result] = useMutation(EDIT_NUMBER, {
    onError: (error) => setError(error.graphQLErrors[0].message),
  })

  const submit = (event) => {
    event.preventDefault()

    changeNumber({ variables: { name, phone } })
    setName("")
    setPhone("")
  }

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError("person not found")
    }
  }, [result.data]) //eslint-disable-line

  return (
    <div>
      <h2>change number</h2>

      <form onSubmit={submit}>
        <div>
          <label htmlFor="name">name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone">phone:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <button type="submit">edit phone!</button>
      </form>
    </div>
  )
}

export default PhoneForm