import { createSlice } from "@reduxjs/toolkit"


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state,action){
      const id = action.payload
      const anecdoteToBeUpdated = state.find(a => a.id===id)
      const newAnecdote = {
        ...anecdoteToBeUpdated, 
        votes: anecdoteToBeUpdated.votes+1}

      return state.map(anecdote => anecdote.id!==id ? anecdote : newAnecdote)
    },

    appendAnecdote(state,action){
      state.push(action.payload)
    },

    setAnecdotes(state,action){
      return action.payload
    }
  }
})

export const {addAnecdote, addVote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer