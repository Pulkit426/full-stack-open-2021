import { useDispatch } from "react-redux";
import React from "react";
import { addAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const submitHandler = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(content))

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