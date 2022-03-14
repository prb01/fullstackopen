import { useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'
import CountryData from './components/CountryData'


const Warning = ({show, msg}) => (
  <span style={{color: 'red', marginLeft: '1em'}}>{msg}</span>
)

const CountryLI = ({data, setSearch}) => (
  data.map(d => 
    <li key={d.name.official}>{d.name.common}&emsp;
      <button onClick={() => setSearch(d.name.common)}>Show Country</button>
    </li>
  )
)

function Display({ filteredData, search, setSearch }) {
  if (search === '' || filteredData.length === 0) {
    return null
  }

  if (filteredData.length > 10) {
      return <Warning msg={'Please be more specific in your query'} />
    }
  
    if (filteredData.length > 1 && 
      filteredData.every((country) => country.name.common.toLowerCase() !== search.toLowerCase())) {
        return (
          <ul>
            <CountryLI data={filteredData} setSearch={setSearch}/>
        {/* {filteredData.map(d => <li key={d.name.official}>{d.name.common}</li>)} */}
      </ul>
    )
  }
  
  let country
  if (filteredData.length === 1) {
    country = filteredData[0]
  } else {
    country = filteredData.find(c => c.name.common.toLowerCase() === search.toLowerCase())
  }
  return <CountryData country={country} />
}

function App() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const handleSearchChange = e => setSearch(e.target.value)
  const filteredData = () => data.filter(d => d.name.common.toLowerCase().includes(search.toLowerCase()))
  const countryHook = () => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(res => {
      setData(res.data)
    })
  }
  useEffect(countryHook, [])
  
  return (
    <div>
      <h2>Country Data Search</h2>
      <p>Start by typing a country name</p>
      <input type='text' onChange={handleSearchChange} value={search}/>
      <hr />
      <Display filteredData={filteredData()} search={search} setSearch={setSearch} />
    </div>
  )
}

export default App;
