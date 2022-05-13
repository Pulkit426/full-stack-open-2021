import { connect } from "react-redux"
import { setFilter } from "../reducers/filterReducer"



const Filter = (props) => {
    const handleChange = (event) => {
     props.setFilter(event.target.value)
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  const mapDispatchToProps = {
    setFilter
  }

  const connectedFilter = connect(
    null,
    mapDispatchToProps
  )(Filter)

  export default connectedFilter