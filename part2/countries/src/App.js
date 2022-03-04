import React, {useEffect, useState} from 'react'
import axios from 'axios'
import CountryData from './components/CountryData'
import CountryList from './components/CountryList'


function App() {
  const [countries,setCountries] = useState([])
  const [formValue,setFormValue] = useState('')

  useEffect( () => {axios.get(`https://restcountries.com/v3.1/name/${formValue}`)
        .then(response => {
          console.log("Inside Promise",response.data)
          setCountries(response.data)})
        }, [formValue] )

  
  const displayData= ()=>{
    if(countries.length>10)
    return <div> Too many matches, specify another filter </div>

    else if(countries.length>1 && countries.length<=10)
    return <CountryList countries={countries} handleClick={handleClick} />

    else if(countries.length===1)
    return <CountryData countries={countries} />
 
  }

  const handleChange = (event) => {
    setFormValue(event.target.value)
  }

  const handleClick = (country) => {
    console.log('inside CLick')
    setCountries([country])


}

  return (
    <div>
     <h3>
      find countries       
      <input type="text" name="countries" onChange={handleChange}/>
    </h3>
    <br /> <br />

    
    

   {countries.length>0 && displayData() }
    </div>
    
  )
}

export default App;
