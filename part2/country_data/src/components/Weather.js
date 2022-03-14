import axios from 'axios'
import { useState, useEffect } from 'react'

const Weather = ({lat, lon}) => {
  const [weather, setWeather] = useState({})
  const weatherHook = () => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
      .then(res => {
        setWeather(res.data)
      })
  }
  useEffect(weatherHook, [])

  if (Object.keys(weather).length === 0) return null

  const sky = weather.weather
  const main = weather.main
  const wind = weather.wind
  return (
    <section className="weather-container">
      <h3>Weather in capital</h3>
      <div className="weather-grid">
        <div className="weather-icon">
            <img src={`http://openweathermap.org/img/wn/${sky[0].icon}@2x.png`} alt={sky[0].description} />
          <span className="weather-temp">{Math.floor(main.temp)}°</span>
        </div>
        <div className="weather-data">
          <table>
            <tbody>
              <tr>
                <th>Temp min</th>
                <td>{Math.round(main.temp_min)}°</td>
              </tr>
              <tr>
                <th>Temp max</th>
                <td>{Math.round(main.temp_max)}°</td>
              </tr>
              <tr>
                <th>Pressure</th>
                <td>{main.pressure} hPa</td>
              </tr>
              <tr>
                <th>Humidity</th>
                <td>{main.humidity}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Weather