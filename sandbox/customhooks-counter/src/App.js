import { useState } from "react"

const useCounter = () => {
  const [value, setValue] = useState(0)

  const increase = () => {
    setValue(value + 1)
  }

  const decrease = () => {
    setValue(value - 1)
  }

  const zero = () => {
    setValue(0)
  }

  return {
    value,
    increase,
    decrease,
    zero,
  }
}

const useField = (type) => {
  const [value, setValue] = useState("")

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const App = (props) => {
  const counter = useCounter()

  const left = useCounter()
  const right = useCounter()

  const name = useField("text")
  const address = useField("text")
  const born = useField("date")
  const height = useField("number")

  console.log("counter:", counter)
  console.log("left:", left)
  console.log("right:", right)
  console.log("name:", name)
  console.log("address:", address)
  console.log("born:", born)
  console.log("height:", height)

  return (
    <>
      <div>
        <div>{counter.value}</div>
        <button onClick={counter.increase}>plus</button>
        <button onClick={counter.decrease}>minus</button>
        <button onClick={counter.zero}>zero</button>
      </div>
      <br />
      <br />
      <div>
        {left.value}
        <button onClick={left.increase}>left</button>
        <button onClick={right.increase}>right</button>
        {right.value}
      </div>
      <br />
      <br />
      <div>
        <form>
          <input
            type={name.type}
            value={name.value}
            onChange={name.onChange}
          />
          <input {...address} />
          <input {...born} />
          <input {...height} />
        </form>
      </div>
    </>
  )
}

export default App
