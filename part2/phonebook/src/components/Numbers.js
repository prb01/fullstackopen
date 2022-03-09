const Numbers = ({ persons }) => (
  persons.map((person, i) => <Number key={person.name} person={person} />)
)

const Number = ({ person }) => (
  <p><b>{person.name}</b> | {person.number}</p>
)

export default Numbers