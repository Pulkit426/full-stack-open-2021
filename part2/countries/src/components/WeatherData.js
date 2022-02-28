import React from "react";

const WeatherData = (props) => {
    return(
        <div>
            temp : {props.weather['main'].temp} Celsius 
            <br />
            <img src={`http://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`}  alt="weather image" />
            <br />
            wind : {props.weather.wind.speed} m/s         
            
        </div>  

    )
}


export default WeatherData

