import react,{ useState } from "react";
import Button from './Button.js'
import Statistics from "./Statistics.js";

const App = () => {
 const [good,setGood] = useState(0)
 const [neutral,setNeutral] = useState(0)
 const [bad,setBad] = useState(0)

const handleGood= () => setGood(good+1)
const handleNeutral = () => setNeutral(neutral+1)
const handleBad = () => setBad(bad+1)

return (
  <div>
    <h1> give feedback</h1>
    <Button text="good" handleClick={handleGood} />
    <Button text="neutral" handleClick={handleNeutral} />
    <Button text="bad" handleClick={handleBad} />

    <Statistics good={good} neutral={neutral} bad={bad} />

    
    
    

</div>  
  
)

}

export default App;
