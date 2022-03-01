import React from 'react'
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newVal, setNewVal] = useState({name: '',number:''})
  const [filter, setFilter] = useState({name: '', flag:false})
console.log(persons)
const hook = () => {
  console.log('hook started')
  phonebookService.getAll() 
                  .then(value => {
                    console.log('promise fulfilled', value)
                    setPersons(value)
       })
}

useEffect(hook, [])

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

    phonebookService.create(newVal)
        .then(value => {
          setPersons(prevState => {return [...prevState,value]} )
          document.getElementById('filter').value=""
          setFilter(prevState => {return {name:'',flag:false}})
      } )

    }
    else{

    if(window.confirm(`${newVal.name} is already added to phonebook, replace the old number with a new one ?`)){
      const id = persons.filter(item => item.name===newVal.name).map(item => item.id)

      phonebookService.update(id,newVal)
                      .then(updatedData => 
                            setPersons(prevState => 
                                       prevState.map(item => 
                                                     (item.id!==updatedData.id ? item : updatedData))
                      ))
    }

  }
}


    const handleSearchChange = (event) => {
  
      const {value} = event.target

      const temp = persons.filter(person => person.name.toLowerCase().includes(value.toLowerCase()))
      setFilter({name: temp, flag: true})
    }

    const handleDelete = (id,name) => {
      if(window.confirm(`Delete ${name}`)){
       phonebookService.remove(id)
                        .then(() => setPersons(prevState => prevState.filter(item => item.id!==id)) )
      }
    }

  return (
    <div>

      <h2>Phonebook</h2>
      <Filter handler={handleSearchChange} />
     
      <h3> add a new</h3>
      <PersonForm newVal={newVal} handleChange={handleChange} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons filter={filter} persons= {persons} handleDelete={handleDelete} />
    </div>
  )
}

export default App