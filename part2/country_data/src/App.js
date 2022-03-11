import { useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'
import JSONPretty from 'react-json-pretty'

function Warning({display, msg}) {
  if (display === false) return <span style={{color: 'red', marginLeft: '1em'}}>{msg}</span>
  return null
}

function App() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [invalidSearch, setInvalidSearch] = useState(false)
  const handleSearchChange = e => setSearch(e.target.value)
  const hook = () => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(res => {
      console.log("data pulled")
      setData(res.data)
    })
  }
  useEffect(hook, [])
  
  const dataToShow = () => {
    console.log("filterData called")
    if (search === '') return null
    
    const filteredData = data.filter(d => d.name.common.toLowerCase().includes(search.toLowerCase()))
    if (filteredData.length > 10) {
      // setInvalidSearch(true)
      // return null
      return false
    }

    // setInvalidSearch(false)
    if (filteredData.length > 1) {
      return filteredData.map(el => el.name.common)
    }

    return filteredData
  }

  return (
    <div>
      <h2>Country Data Search</h2>
      <p>Start by typing a country name</p>
      <input id='country-search' type='text' onChange={handleSearchChange} value={search}/>
      <Warning display={dataToShow()} msg={'Please be more specific in your query'} />
      {/* <Warning display={invalidSearch} msg={'Please be more specific in your query'} /> */}
      
      <hr />

      <JSONPretty id="json-pretty" data={dataToShow()} />
    </div>
  )
}

export default App;
