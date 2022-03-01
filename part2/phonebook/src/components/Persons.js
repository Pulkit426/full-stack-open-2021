import React from "react";

const Persons = (props) =>{
    return (
        <div>
            {props.filter.flag 
            ? props.filter.name.map(person => <p key={person.id}>{person.name} {person.number} <button onClick={() => props.handleDelete(person.id,person.name)}> delete </button></p>)
            : props.persons.map(person => <p key={person.id}>{person.name} {person.number} <button onClick={() => props.handleDelete(person.id,person.name)}> delete </button></p>)}
        </div>
    )
}

export default Persons