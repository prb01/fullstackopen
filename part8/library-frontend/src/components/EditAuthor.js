import { useState } from "react"
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries"
import { useMutation } from "@apollo/client"

const EditAuthor = () => {
  const [name, setName] = useState("")
  const [year, setYear] = useState("")
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, setBornTo: Number(year) } })
    setName("")
    setYear("")
  }

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={handleSubmit}>
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
          <label htmlFor="year">born:</label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>

        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default EditAuthor
