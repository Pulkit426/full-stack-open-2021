import React,{ useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user,setUser] = useState(null)
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [notification, setNotification] = useState('')
  const [newBlog, setNewBlog] = useState({
    title :"",
    author : "",
    url: ""
  })

  useEffect( () => {
    const setInitialBlogs = async () => {
    const request =  await blogService.getAll()
    setBlogs(request)
    console.log(request)
    console.log("inside useff 1")
    console.log(blogs)
    }
    setInitialBlogs()
  }, [])

  useEffect( () => {
    const loggedUser = window.localStorage.getItem('loggedUser') 
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showFilterBlogs = () => {
    console.log("inside filter")
    console.log(blogs)
    const filteredBlogs = blogs.filter(blog => blog.user.username===user.username)
    console.log(filteredBlogs)

    return filteredBlogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({ username,password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } 

    catch(exception){
      console.log('ERORR')
      setNotification('Wrong Username or Password')
      setTimeout(() => setNotification(''), 5000)
    }

  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    blogService.setToken(null)
  }

  const handleChangeNewBlogForm = (event) => {
    const {name,value} = event.target

    setNewBlog(prevBlog => {
      return {
        ...prevBlog,
        [name]: value
      }
    })
  }

  const handleSubmitNewBlogForm = async (event) => {
    event.preventDefault()
    console.log("Submitted")
    await blogService.create(newBlog)
    setNotification(`${newBlog.title} by ${newBlog.author} added`)
    setTimeout( () => setNotification(''), 5000)
  }

  if (user === null) {
    return (
      <div>
             
        <h2>Log in to application</h2>
        <h1>{notification}</h1>
        <form onSubmit={handleLogin}>
   <div>
     Username <input 
                type="text" 
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}/>
    </div> 
    <div>
    Password <input 
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)} />

    </div>
   <button type="submit"> login </button>
  </form>
      </div>
    )
  }

  return (
    <div>
      
      <h2>BLOGS</h2>
      <h1>{notification}</h1>
      {user.name} logged in 
      <button onClick={handleLogout} > logout </button>
      
      <h2>Create New </h2>

      <form onSubmit={handleSubmitNewBlogForm}>
      <div>
      title <input 
      type="text"
      name="title"
      value={newBlog.title}
      onChange={handleChangeNewBlogForm} />

      </div>

      <div>
      author <input 
      type="text"
      name="author"
      value={newBlog.author}
      onChange={handleChangeNewBlogForm} />
      </div>
      
    <div>
    url <input 
      type="text"
      name="url"
      value={newBlog.url}
      onChange={handleChangeNewBlogForm} />
    </div>

    <button type="submit"> Create </button>
      </form>
      {showFilterBlogs()}

    </div>

  )
}

export default App
