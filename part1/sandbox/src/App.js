import './App.css';
import { useState } from 'react';

const Display = ({counter}) => <div><h1>{counter}</h1></div>
const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)
const History = ({allClicks}) => {
  if (allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing buttons
      </div>
    )
  } else {
    return (
      <div>
        {allClicks.join(',')}
      </div>
    )
  }
}

const App = () => {
  // const [counter, setCounter] = useState(0);
  const [value, setValue] = useState(0)
  const [allClicks, setAll] = useState([])

  const setToValue = (newVal, dir) => {
    setAll(allClicks.concat(dir))
    setValue(newVal)
  }
  const hello = (color) => () => {
    return (
      <div class="red">Hello</div>
    )
  }

  return (
    <div>
      <div className='counter'>
        <Display counter={value} />
      </div>
      <Button onClick={() => setToValue(value + 1, 'L')} text={`increment`} />
      <Button onClick={() => setToValue(value + 1000, 'R')} text={`add 1000`} />
      <Button onClick={hello('red')} text={`Hello`} />
      <History allClicks={allClicks} />
    </div>
  )
}

export default App;

