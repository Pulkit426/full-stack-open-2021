import React from 'react'
import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]) 
  const [newVal, setNewVal] = useState({name: '',phone:''})

  const [filter, setFilter] = useState({name: '', flag:false})

  const handleChange = (event) => {
    const {name,value} = event.target 

    setNewVal(prevState => {
      return {
        ...prevState,
        [name] : value
    }
  })

  }

  const check = () => {
    for(let person of persons){
      if(person.name===newVal.name)
      return false
    }

    return true
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    if(check()){
    setPersons(prevState => {return [...prevState,newVal]} )
    document.getElementById('filter').value=""
    setFilter(prevState => {return {name:'',flag:false}})
    }
    else
    alert(`${newVal.name} is already added to phonebook`)
    }


    const handleSearchChange = (event) => {
  
      const {value} = event.target

      const temp = persons.filter(person => person.name.toLowerCase().includes(value.toLowerCase()))
      setFilter({name: temp, flag: true})
    }

  return (
    <div>

      <h2>Phonebook</h2>
      <Filter handler={handleSearchChange} />
     
      <h3> add a new</h3>
      <PersonForm newVal={newVal} handleChange={handleChange} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons filter={filter} persons= {persons} />
    </div>
  )
}

export default App