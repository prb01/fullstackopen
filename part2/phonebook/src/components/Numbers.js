const Numbers = ({ persons }) => (
  persons.map((person, i) => <Number key={person.name} person={person} />)
)

const Number = ({ person }) => (
  <p>{person.name}</p>
)

export default Numbers