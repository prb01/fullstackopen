import Weather from './Weather'

const CountryData = ({country}) => (
  <>
  <section className="country-container">
    <h2>{country.name.common} {country.flag}</h2>
    <h3>
      aka {Object.keys(country.name.nativeName)
        .map(name => country.name.nativeName[name]['official'])
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
              .map(ccy => `${ccy} (${country.currencies[ccy]['symbol']})`)
              .join(", ")}
          </td>
        </tr>
      </tbody>
    </table>
    </section>
    <Weather lat={country.capitalInfo.latlng[0]} lon={country.capitalInfo.latlng[1]} />
  </>
)

export default CountryData;