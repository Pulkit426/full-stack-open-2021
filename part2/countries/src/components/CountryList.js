import React from "react";

const CountryList = ({countries,handleClick}) => {

    

    return (
    <div> 
        {countries.map(country => <div>{country.name.common} 
                                  <button onClick={() => handleClick(country)}> show </button>
                                  </div>)} 
                                  
    </div>
    )
        
}

export default CountryList



