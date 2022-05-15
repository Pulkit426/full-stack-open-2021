import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

const CreateNew = (props) => {
    const [content, resetContent] = useField('text')
    const [author, resetAuthor] = useField('text')
    const [info, resetInfo] = useField('text')
    const navigate = useNavigate()
  
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
       content: content.value, 
       author:  author.value,
        info: info.value,
        votes: 0
      })
      navigate('/')
      props.setNotification(`a new anecdote '${content.value}' created`)
      setTimeout(() => props.setNotification(''), 5000)

    }

    const handleReset = () => {
      resetContent()
      resetAuthor()
      resetInfo()
    }

  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
           
            <input name='content' {...content} />
          </div>
          <div>
            author
            <input name='author' {...author} />
          </div>
          <div>
            url for more info
            <input name='info' {...info} />
          </div>
          <button>create</button>
        </form>

        <button onClick={handleReset}> reset </button>
      </div>
    )
  
  }

  export default CreateNew