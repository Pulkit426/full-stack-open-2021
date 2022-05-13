import { useDispatch } from "react-redux";
import React from "react";
import { appendAnecdote } from "../reducers/anecdoteReducer";
import { removeNotification, setNotificationForAdd } from "../reducers/notificationReducer";
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const submitHandler = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.create(content)
        dispatch(appendAnecdote(newAnecdote))
        dispatch(setNotificationForAdd(content))
        setTimeout(() => {dispatch(removeNotification())},5000)

    }

    return (
        <div>
              <h2>create new</h2>
              <form onSubmit={submitHandler}>
            <input type="text"
                    name="anecdote" />
            <button type="submit">Create</button>

        </form>
        </div>
        
    )
}

export default AnecdoteForm