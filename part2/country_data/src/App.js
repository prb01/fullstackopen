import { useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'
import JSONPretty from 'react-json-pretty'

const Warning = ({show, msg}) => (
  <span style={{color: 'red', marginLeft: '1em'}}>{msg}</span>
)

function Display({ filteredData, search }) {
  if (search === '' || filteredData.length === 0) {
    return null
  }

  if (filteredData.length > 10) {
      return <Warning msg={'Please be more specific in your query'} />
    }
  
  const country = filteredData[0]
  if (filteredData.length > 1 && country.name.common.toLowerCase() !== search.toLowerCase()) {
    return (
      <ul>
        {filteredData.map(d => <li key={d.name.official}>{d.name.common}</li>)}
      </ul>
    )
  }

  return (
    <>
    <h2>{country.name.common} {country.flag}</h2>
    <h3>
      aka {Object.keys(country.name.nativeName)
              .map(name=>country.name.nativeName[name]['official'])
              .join(", ")}
    </h3>
    <table>
      <tbody>
        <tr>
          <th>Capital</th>
          <td>{country.capital}</td>
        </tr>
        <tr>
          <th>Region</th>
          <td>{country.region}</td>
        </tr>
        <tr>
          <th>Area</th>
          <td>{country.area}</td>
        </tr>
        <tr>
          <th>Languages</th>
          <td>{Object.keys(country.languages).join(", ")}</td>
        </tr>
        <tr>
          <th>Currencies</th>
          <td>
          {Object.keys(country.currencies)
            .map(ccy=>`${ccy} (${country.currencies[ccy]['symbol']})`)
            .join(", ")}
          </td>
        </tr>
      </tbody>
    </table>
    </>
  )
}

function App() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const handleSearchChange = e => setSearch(e.target.value)
  const filteredData = () => data.filter(d => d.name.common.toLowerCase().includes(search.toLowerCase()))
  const hook = () => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(res => {
      setData(res.data)
    })
  }
  useEffect(hook, [])
  
  return (
    <div>
      <h2>Country Data Search</h2>
      <p>Start by typing a country name</p>
      <input type='text' onChange={handleSearchChange} value={search}/>
      <hr />
      <Display filteredData={filteredData()} search={search} />
    </div>
  )
}

export default App;
