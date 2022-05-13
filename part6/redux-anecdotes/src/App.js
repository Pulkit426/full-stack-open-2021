import React, {useEffect} from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdotesList from './components/AnecdotesList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { useDispatch } from 'react-redux'
import { setAnecdotes } from './reducers/anecdoteReducer'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then(item => dispatch(setAnecdotes(item)))
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