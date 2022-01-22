import React,{useState} from 'react'
import Button from './Button.js'

function App() {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)

  const [voteArr,setVote] = useState([0,0,0,0,0,0,0])

  const handleQuote =() => setSelected( Math.floor((Math.random() * 6)) )

  const handleVote= () => {
    const copy= [...voteArr]
    copy[selected]++;
    setVote(copy)
  }

  const max = () => {
    const val= Math.max(...voteArr)
    return voteArr.findIndex( vote => vote===val)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <h3>{anecdotes[selected]}</h3>

      <Button text="Vote" handleClick={handleVote} />

      <Button text="next anecdote"
      handleClick={handleQuote} />

      <h1> Anecdote with most votes</h1>
      <h3>{anecdotes[max()]} </h3>
    
    </div>


  )
}
  

export default App;
