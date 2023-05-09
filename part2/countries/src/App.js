import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
    const [value, setValue] = useState('')
    const [countries, setCountries] = useState([])

    useEffect(() => {
        axios
        .get(`https://restcountries.com/v3.1/name/${value}`)
        .then(response => {
            setCountries(response.data)
        })
        .catch(error => {
            setCountries([])
        })
    }, [value])

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const countriesToShow = value === '' ? [] : countries

    return (
        <div>
            <div>
                find countries <input value={value} onChange={handleChange}></input>
            </div>
            <Countries countries={countriesToShow} />
        </div>
    )
}

export default App;
