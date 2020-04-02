import React, { useState, useEffect } from 'react'
import Search from './Search.js'
import axios from 'axios'

const App = () => {
    const [name, setName] = useState('')
    const [countries, setCountries] = useState([])

    const hook = () => {
        const promise = axios.get("https://restcountries.eu/rest/v2/all")
        const callback = (response) => {
            setCountries(response.data)
        }

        promise.then(callback)
            .catch((error) => console.log(error))
    }

    useEffect(hook, [])

    // Callback func
    const nameEventHandler = (event) => {
        setName(event.target.value)
    }

    return (
        <div id="body">
            <div id="userInput">
                find countries
                <input type="text" onChange={nameEventHandler} value={name} />
            </div>
            {/* Pass the parent's setState function to the child, so the child can affect the parent's state */}
            <Search countriesData={countries} setCountryName={setName} countryName={name} />
        </div>
    )
}

export default App