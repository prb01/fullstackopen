// import { useDispatch } from "react-redux"
import { connect } from "react-redux"
import { updateFilter } from "../reducers/filterReducer"

const Filter = (props) => {
  // const dispatch = useDispatch()

  const handleChange = (event) => {
    const search = event.target.value
    // dispatch(updateFilter(search))
    props.updateFilter(search)
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

// export default Filter

export default connect(null, { updateFilter })(Filter)
