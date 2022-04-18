import { filterChange } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const VisibilityFilter = (props) => {
  const dispatch = useDispatch()

  const filterSelected = (value) => {
    console.log(value)
    dispatch(filterChange(value))
  }

  return (
    <div>
      <label>
        All
        <input
          type="radio"
          name="filter"
          onChange={() => filterSelected("ALL")}
        />
      </label>
      <label>
        Important
        <input
          type="radio"
          name="filter"
          onChange={() => filterSelected("IMPORTANT")}
        />
      </label>
      <label>
        Non-Important
        <input
          type="radio"
          name="filter"
          onChange={() => filterSelected("NONIMPORTANT")}
        />
      </label>
    </div>
  )
}

export default VisibilityFilter