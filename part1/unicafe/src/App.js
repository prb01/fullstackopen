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

const Stats = (props) => {
  if (props.total === 0) {
    return (
      <div className="stats-container">
        <span className="stat-text">No feedback provided yet</span>
      </div>
    )
  }

  return (
    <div className="stats-container">
      <table>
        <tbody>
          <StatisticLine text={`Total`} value={props.total} />
          <StatisticLine text={`Average`} value={props.avg} />
          <StatisticLine text={`Positive%`} value={`${props.pos}%`} />
        </tbody>
      </table>
    </div>
    )
}

const StatisticLine = ({text, value}) => (
  <tr>
    <td><span className="stat-text">{text}: </span></td>
    <td>{value}</td>
  </tr>
)


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const avg = Math.round(((good + (bad * -1)) / total) * 100) / 100
  const pos = Math.round(((good / total) * 100) * 100) / 100

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
      
      <hr />
      <Stats total={total} avg={avg} pos={pos} />
    </div>
    </> 
  )
}

export default App


// the total number of collected feedback, 
// the average score(good: 1, neutral: 0, bad: -1) 
// and the percentage of positive feedback
