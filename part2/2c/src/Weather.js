import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Weather = ({ capital }) => {
    const [weatherData, setWeatherData] = useState({})
    const [hasCompleted, setHasCompleted] = useState(false)

    // useEffect( callBack fn, [])
    // mistake was using a statement instead of callBack fn

    useEffect(() => {
        axios.get('https://api.openweathermap.org/data/2.5/weather?q=+' + capital + '+&appid=76597282a9a5c7ec437f42c87693b71d')
            .then((response) => {
                setWeatherData({
                    temp: response.data.main.temp,
                    speed: response.data.wind.speed
                })
                setHasCompleted(true)
            })
    }
        , [capital])

    return hasCompleted ? (
        <div>
            <h2>Weather in {capital} </h2>
            <br></br>
            <b> temperature: </b> {weatherData.temp} K
            <br></br>
            <b>wind:</b> {weatherData.speed}
        </div>
    ) : (
            <div>
                Loading ...
            </div>)

}


export default Weather