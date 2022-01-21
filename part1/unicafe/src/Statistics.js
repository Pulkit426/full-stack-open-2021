import React from "react"
import StatisticsLine from './StatisticsLine.js'

const Statistics = ({good,neutral,bad}) => {
    if(good+neutral+bad===0){
      return (
        <>
        <h1>statistics</h1>
        <h4>No feedback given</h4>
        </>
      )
    }
  
    else {
    return (
      <>
      <h1> statistics </h1>
    <StatisticsLine text="good" value={good} />
  
      <StatisticsLine text="neutral" value={neutral} />
  
    <StatisticsLine text="bad" value= {bad} />
  
    <StatisticsLine text="all"  value={good+neutral+bad} />
  
    <StatisticsLine text="average" value={(good*1 + bad*(-1)) / (good+neutral+bad)} />
  
    <StatisticsLine text="positive %" value= {good*100/(good+neutral+bad)} />
  
      </>
    
    )
    }
  
  }

  export default Statistics