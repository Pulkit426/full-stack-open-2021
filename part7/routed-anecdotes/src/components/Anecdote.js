import { useParams } from "react-router-dom";

const Anecdote = ({anecdotes}) => {
    const id = useParams().id
    const anecdote = anecdotes.find(item => item.id === Number(id))
    return (
        <div>
            <h1>{anecdote.content}</h1>
            has {anecdote.votes} votes

            for more info see <a href={`${anecdote.info}`}> {anecdote.info} </a>
        </div>
    )
}

export default Anecdote