import React from "react";

const Filter = (props) => {
    return (
        <div>
            filter shown with <input id="filter" type="text" onChange={props.handler}></input>
        </div>

    )
}

export default Filter