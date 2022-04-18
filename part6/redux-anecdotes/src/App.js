import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Notification from "./components/Notification"

const App = () => {
  return (
    <div>
      <Notification />
      <AnecdoteForm />
      <h2>Anecdotes</h2>
      <AnecdoteList />
    </div>
  )
}

export default App
