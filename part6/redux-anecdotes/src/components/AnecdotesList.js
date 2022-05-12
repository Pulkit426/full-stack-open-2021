import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { removeNotification, setNotificationForVote } from "../reducers/notificationReducer"

const AnecdotesList = () => {


  const anecdotes = useSelector( ({anecdotes,filter}) => {
    if(!filter)
    return anecdotes
    else {
      return anecdotes.filter(item  => item.content.includes(filter))
    }  
  })

  console.log(anecdotes)
  const dispatch = useDispatch()

  const vote = (id,content) => {
    console.log('vote', id)
    dispatch(addVote(id))
    dispatch(setNotificationForVote(content))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

    return (
        <div>
           
      {anecdotes.slice().sort((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
    )}
    </div>
)}

export default AnecdotesList