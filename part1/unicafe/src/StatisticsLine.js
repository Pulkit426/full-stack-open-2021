import React from "react"

const StatisticsLine = ({text,value}) => {
    return (
    <h4>
      <tr >
        <td style={{width:"100px"}}>{text}</td>
        <td>{value}</td>
      </tr>  
    </h4>
    )
    }

  export default StatisticsLine  