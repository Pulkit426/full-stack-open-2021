import React from "react";

const PersonForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
        <div>
          name: <input name='name' value={props.newVal.name} onChange={props.handleChange} />
        </div>
        <div>
          phone: <input name='phone' value={props.newVal.phone} onChange={props.handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm