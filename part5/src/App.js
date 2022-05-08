// eslint-disable-next-line no-unused-vars
import axios from 'axios'
import React,{ useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user,setUser] = useState(null)
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [notification, setNotification] = useState('')


  const blogFormRef = useRef()

  const setInitialBlogs = async () => {
    const request =  await blogService.getAll()
    setBlogs(request)
  }

  useEffect(() => {
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

  useEffect(() => {
    const timer = setTimeout(() => setNotification(''), 4000)
    return () => clearTimeout(timer)
  }, [notification])




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

    catch(error){
      setNotification(`${error.response.data.error}`)
      console.warn(error)
    }

  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    blogService.setToken(null)
  }



  const addBlog = async (newBlog) => {

    try{
      await blogService.create(newBlog)
      blogFormRef.current.toggleVisibility()
      setNotification(`${newBlog.title} by ${newBlog.author} added`)

      const updatedBlogList = await blogService.getAll()
      setBlogs(updatedBlogList)
    }
    catch(error){
      setNotification(`${error.response.data.error}`)
      console.warn(error)
    }

  }

  const likeBlog = async (id) => {

    const blogToUpdate = blogs.find(blog => blog.id===id)
    console.log(blogToUpdate)
    if(blogToUpdate){
      try{
        const likes = blogToUpdate.likes ? blogToUpdate.likes+1 : 1
        const updatedBlog = {
          ...blogToUpdate,
          likes
        }
        console.log(updatedBlog)

        const response = await blogService.update(updatedBlog.id,updatedBlog)

        if(response){
          const updatedBlogList = blogs.map((blog) =>
            blog.id === id ? updatedBlog : blog
          )
          setBlogs(updatedBlogList)
        }
      }
      catch(error){
        setNotification(`${error.response.data.error}`)
        console.warn(error)

      }
    }

  }

  const deleteBlog = async (id) => {
    try{
      if(window.confirm('Do you want to delete this')){
        await blogService.remove(id)
        const updatedBlogList = blogs.filter((blog) => blog.id !== id)
        setBlogs(updatedBlogList)
        setNotification('Deleted')

      }
    }
    catch(error){
      setNotification(`${error.response.data.error}`)
      console.warn(error)
    }
  }

  const renderLoginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <h1>{notification}</h1>
        <Togglable buttonLabel="Login" >
          <LoginForm username={username}
            password = {password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}

          />
        </Togglable>

      </div>

    )
  }

  const renderBlogs = () => {
    return (
      <div>

        <h2>BLOGS</h2>
        <h1>{notification}</h1>
        {user.name} logged in
        <button onClick={handleLogout} > logout </button>

        <Togglable buttonLabel='Create New Blog' ref = {blogFormRef}>
          <BlogForm addBlog= {addBlog} />
        </Togglable>


        <div>
          {blogs.length &&
    blogs.sort((first,second) => second.likes - first.likes)
      .map(blog =>
        (<Blog
          key={blog.id}
          blog={blog}
          likeBlog={() => likeBlog(blog.id)}
          deleteBlog={() => deleteBlog(blog.id)}
          user= {user}
        />))}
        </div>
      </div>

    )
  }

  return (
    <div>
      {user && user.token ? renderBlogs() : renderLoginForm()}
    </div>

  )
}

export default App
