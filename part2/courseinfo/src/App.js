const Header = ({name}) => <h2>{name}</h2>
const Part = ({ part }) => <p>{part.name}: {part.exercises}</p>
const Total = ({ parts }) => {
  const totalExercises = parts.reduce((curr, prev) => (
    { exercises: curr.exercises + prev.exercises }
  )).exercises

  return <p><b>Total Exercises: {totalExercises}</b></p>
}

const Course = ({ course }) => (
    <><Header name={course.name} />
    { course.parts.map( part => (
      <Part key={part.id} part={part} />
    ))}
    <Total parts={course.parts} /></>
  )

const Courses = ({ courses }) => (
  <>
  <h1>Web Development Track</h1>
  {courses.map( course => (
    <Course key={course.id} course={course} />
  ))}
  </>
)



const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Courses courses={courses} />
}

export default App