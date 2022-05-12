import { useDispatch } from "react-redux";
import React from "react";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { removeNotification, setNotificationForAdd } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const submitHandler = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(content))
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