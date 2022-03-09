const Header = ({name}) => <h1>{name}</h1>
const Part = ({ part }) => <p>{part.name}: {part.exercises}</p>
const Total = ({ parts }) => {
  const totalExercises = parts.reduce((curr, prev) => (
    { exercises: curr.exercises + prev.exercises }
  )).exercises

  return <p><b>Total Exercises: {totalExercises}</b></p>
}

const Course = ({ course }) => {
  return (
    <><Header name={course.name} />
    { course.parts.map( part => (
      <Part key={part.id} part={part} />
    ))}
    <Total parts={course.parts} /></>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Fake part',
        exercises: 8,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App