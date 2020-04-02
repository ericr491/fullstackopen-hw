import React from 'react'
import Country from './Country.js'

const Search = ({ countriesData, setCountryName, countryName }) => {

    const filteredCountries = countriesData.filter((country) => country.name.toLowerCase().includes(countryName.toLowerCase()))

    const renderArray = (array) => {
        if (array.length > 10 || array.length < 1)
            return "Too many matches or No match, specify another filter"
        else if (array.length === 1) {
            return <Country countryObject={array[0]} />
        }
        else return array.map((element) => {
            return (
                <div>
                    {element.name}
                    <button onClick={(event) => setCountryName(element.name)} > show </button>
                </div>
            )
        })
    }

    return (
        <div id="countryList">
            {renderArray(filteredCountries)}
        </div>
    )
}

export default Search