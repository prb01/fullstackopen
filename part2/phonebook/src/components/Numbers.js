const Numbers = ({ persons, clickDelete }) => (
  persons.map((person, i) => 
  <Number key={person.name} person={person} clickDelete={() => clickDelete(person.id)} />)
)

const Number = ({ person, clickDelete }) => (
  <li>
    <b>{person.name}</b> | {person.number}
    <button onClick={clickDelete}>delete</button>
  </li>
)

export default Numbers