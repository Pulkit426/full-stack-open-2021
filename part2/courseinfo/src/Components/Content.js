import React from "react"
import Part from './Part.js'

const Content = ({course}) =>{
   
    return (
        <div>
           {course.parts.map(item => <Part id={item.id} part={item} />)}
        </div>
    )
}

export default Content