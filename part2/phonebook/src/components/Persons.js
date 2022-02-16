import React from "react";

const Persons = (props) =>{
    return (
        <div>
            {props.filter.flag 
            ? props.filter.name.map(person => <p key={person.name}>{person.name} {person.phone}</p>)
            : props.persons.map(person => <p key={person.name}>{person.name} {person.phone}</p>)}
        </div>
    )
}

export default Persons