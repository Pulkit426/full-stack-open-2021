import React from 'react'

const Total = (props) => {

    const total =  props.parts.reduce((total,curr) => (total+curr.exercises) , 0)

    return (
      <p>
        <strong>
          Number of exercises {total} 
        </strong> 
      </p>

    )
}

export default Total