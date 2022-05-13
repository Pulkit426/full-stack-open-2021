import React, {useEffect} from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdotesList from './components/AnecdotesList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  },[dispatch])
  
  return (
    <div>
     
       <h2>Anecdotes</h2>
       <Notification />
       <Filter />
      <AnecdotesList />    
      <AnecdoteForm />
    </div>
  )
}

export default App