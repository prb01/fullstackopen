import { useMutation } from "@apollo/client"
import { EDIT_NUMBER, ALL_PERSONS } from "../queries"
import { useState } from "react"

const PhoneForm = ({ setError }) => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [changeNumber] = useMutation(EDIT_NUMBER, {
    onError: (error) => setError(error.graphQLErrors[0].message),
  })

  const submit = (event) => {
    event.preventDefault()

    changeNumber({ variables: { name, phone } })
    setName("")
    setPhone("")
  }

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