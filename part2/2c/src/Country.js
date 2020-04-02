import React from 'react'
import Weather from './Weather.js'

const Country = (props) => {

    const { name, capital, population, languages, flag } = props.countryObject

    const renderLanguages = (languagesArray) => {
        return languagesArray.map(language => { return <li>{language.name}</li> })
    }

    return (
        <div>
            <p> {name} </p>
            capital {capital} <br />
            population {population} <br />
            <br />
            <b> languages </b>
            <ul>
                {renderLanguages(languages)}
            </ul>
            <div id="flag">
                <img src={flag} height="30%" width="30%" alt="Loading flag ..." />
            </div>
            <Weather capital={capital} />
        </div>
    )
}

export default Country