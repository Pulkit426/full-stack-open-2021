import React from "react";
import '../index.css'

const Notification = ({message}) => {
    if(message==null)
    return null

    let selector
    if(message.includes('Added'))
    selector="success"
    else if(message.includes('removed'))
    selector="error"

    return (
        <div className={selector}>

            {message}
        </div>
    )
}

export default Notification