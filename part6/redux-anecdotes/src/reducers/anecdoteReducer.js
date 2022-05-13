import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setVote(state,action){
      const newAnecdote = action.payload
      return state.map(anecdote => anecdote.id!==newAnecdote.id ? anecdote : newAnecdote)
      
    },

    appendAnecdote(state,action){
      state.push(action.payload)
    },

    setAnecdotes(state,action){
      return action.payload
    }
  }
})

export const {setVote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = (id) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const anecdoteToBeUpdated = anecdotes.find(a => a.id===id)
      const newAnecdote = {
        ...anecdoteToBeUpdated, 
        votes: anecdoteToBeUpdated.votes+1}
      
      const response = await anecdoteService.addVote(id,newAnecdote)
      console.log("INSIDE VOTES",response)
      dispatch(setVote(response))
      
  }

}

export default anecdoteSlice.reducer