import axios from "axios"
import React, {useEffect, useState} from "react"
import WeatherData from './WeatherData'


const CountryData = ({countries}) => {

    const [weather,setWeather] = useState({})
    const [flag,setFlag] = useState(false)

    useEffect( () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${countries[0].capital}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
             .then(response => {
                 setWeather(response.data)
                 setFlag(true)
                })
    }, [])

    console.log(weather)

    return (
        <div> 
            <h3> {countries[0].name.common} </h3>
            <p> 
              capital {countries[0].capital}
              <br />
              area {countries[0].area}
            </p>
    
    
            <p> <b> languages:  </b> </p>
            <br />
            
            {Object.keys(countries[0].languages).map( key => <li key={key}> {countries[0].languages[key]} </li> )}
            <br />
            <img src={countries[0].flags.png} alt="country flag" />  

             <h3> weather in {countries[0].capital}</h3> 
             {flag && < WeatherData weather={weather} />}
              
        </div>
    )
      
    }


    export default CountryData
    

