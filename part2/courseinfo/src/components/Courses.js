const Header = ({ name }) => <h2>{name}</h2>
const Part = ({ part }) => <p>{part.name}: {part.exercises}</p>
const Total = ({ parts }) => {
  const totalExercises = parts.reduce((curr, prev) => (
    { exercises: curr.exercises + prev.exercises }
  )).exercises

  return <p><b>Total Exercises: {totalExercises}</b></p>
}

const Course = ({ course }) => (
  <>
    <Header name={course.name} />
    {course.parts.map(part => (
      <Part key={part.id} part={part} />
    ))}
    <Total parts={course.parts} />
  </>
)

const Courses = ({ courses }) => (
  <>
    <h1>Web Development Track</h1>
    {courses.map(course => (
      <Course key={course.id} course={course} />
    ))}
  </>
)

export default Courses