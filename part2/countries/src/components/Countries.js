import axios from 'axios'

const Weather = ({ weather }) => {
    if (!weather) {
        return <></>
    }

    return (
        <div>
            <div>{weather.main.temp} Celsius</div>
            <img src={`https://openweathermap.org/img/wn/${weather.weather.icon}@2x.png`} alt=''></img>
            <div>wind {weather.wind.speed} m/s</div>
        </div>
    )
}

const Country = ({ country }) => {
    const [weather, setWeather] = useState(null)
    axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
        .then(response => {
            setWeather(response.data)
        })

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>{`capital ${country.capital}`} </p>
            <p>{`area ${country.area}`}</p>
            <strong>languages:</strong>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <div>
                <img className='flag' src={country.flags.png} alt={country.flags.alt}></img>
            </div>
            <strong>Weather in {country.capital}</strong>
            <div>
                <Weather weather={weather}/>
            </div>
        </div>
    )
}

const Countries = ({ countries }) => {
    const [shownCountries, setShownCountries] = useState(countries)

    const handleShow = (country) => {
        setShownCountries([].concat(country))
    }

    const resetShownCountries = () => {
        setShownCountries(countries)
    }

    useEffect(() => {
        setShownCountries(countries)
    }, [countries])

    if (shownCountries.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    } else if (shownCountries.length === 1) {
        return (
            <div>
                <button onClick={resetShownCountries}>back</button>
                <Country country={shownCountries[0]}/>
            </div>
        )
    }

    return (
        <div>
            {countries.map(country => 
            <div key={country.name.common}> 
                {country.name.common} <button onClick={() => handleShow(country)}>show</button>
            </div>)}
        </div>
    )
}

export default Countries