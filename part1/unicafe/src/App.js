import './css/all.min.css';
import './css/App.css';
import { useState } from 'react'

const Button = ({onClick, iClass}) => (
  <button onClick={onClick}>
    <i className={iClass}></i>
  </button>
)

const Counter = ({num}) => (
  <span className="feedback-counter">
    {num}
  </span>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
    <div className="card">
      <h1>Please provide feedback</h1>
      
      <div className="feedback-container">
        <div className="feedback">
          <Button 
            onClick={() => setGood(good + 1)}
            iClass={`fa-solid fa-face-smile feedback-face`}
          />
          <Counter num={good}/>
        </div>
        <div className="feedback">
          <Button
            onClick={() => setNeutral(neutral + 1)}
            iClass={`fa-solid fa-face-meh feedback-face`}
          />
          <Counter num={neutral} />
        </div>
        <div className="feedback">
          <Button
            onClick={() => setBad(bad + 1)}
            iClass={`fa-solid fa-face-frown feedback-face`}
          />
          <Counter num={bad} />
        </div>

          
      </div>
    </div>
    </> 
  )
}

export default App
