import { connect } from "react-redux";
import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {

    const submitHandler = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.setNotification(`you added '${content}'`, 5000)
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

const mapDispatchToProps = {
    createAnecdote,
    setNotification
}

const connectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)

export default connectedAnecdoteForm