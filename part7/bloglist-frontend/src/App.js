// eslint-disable-next-line no-unused-vars
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import usersService from './services/users'
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogsReducer'
import { initializeUsers, login,logout } from "./reducers/usersReducer";
import {
  BrowserRouter as Router,
  Routes, Route, Link, useMatch, useParams, useNavigate
} from "react-router-dom"

import BlogsByUser from "./components/BlogsByUser";
import DetailedBlogPost from "./components/DetailedBlogPost";

const App = () => {
  const blogs = useSelector(state => state.blogs)
  console.log(blogs)
 const user = useSelector(state => state.users)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const notification = useSelector(state => state.notification)
  const [allUsers, setAllUsers] = useState([])
   const dispatch = useDispatch()
   const navigate = useNavigate()

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs())
    console.log(blogs)
  }, [dispatch]);

  useEffect(() => {
    // const loggedUser = window.localStorage.getItem("loggedUser");
    // if (loggedUser) {
    //   const user = JSON.parse(loggedUser);
    //   setUser(user);
    //   blogService.setToken(user.token);
    // }
    dispatch(initializeUsers())
    console.log("INSIDE USE EFFECT, user - ", user)
  }, []);

  const initializeAllUsers = async () => {
    const users = await usersService.getAll()
    setAllUsers(users)
  }

  useEffect(initializeAllUsers, [])

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // const user = await loginService.login({ username, password });
      // window.localStorage.setItem("loggedUser", JSON.stringify(user));
      // blogService.setToken(user.token);
      // setUser(user);
      dispatch(login(username,password))
      setUsername("");
      setPassword("");
    } catch (error) {
      dispatch(setNotification(`${error.response.data.error}`, ))
      console.warn(error);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    // setUser(null);
    // blogService.setToken(null);
    dispatch(logout())
    navigate('/')
  };

  const addBlog = async (newBlog) => {
    try {
      dispatch(createBlog(newBlog))
      blogFormRef.current.toggleVisibility()
    } 
    catch (error) {
      dispatch(setNotification(`${error.response.data.error}`))
      console.warn(error);
    }
  };

  const addLike = async (id) => {
    try{
      dispatch(likeBlog(id))
    }
    catch (error) {
          dispatch(setNotification(`${error.response.data.error}`))
          console.warn(error);
        }
  };

  const removeBlog = async (id) => {
    try {
      dispatch(deleteBlog(id))
    } 
    catch (error) {
      dispatch(setNotification(`${error.response.data.error}`))
      console.warn(error);
    }
  }

  const renderLoginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    );
  };

  const renderBlogs = () => {
    return (
      <div>
        <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
          <BlogForm addBlog={addBlog} />
        </Togglable>
        <div id="blogListWrapper">
          {blogs.length &&
            blogs
              .slice()
              .sort((first, second) => second.likes - first.likes)
              .map((blog) => (
               <Blog
                  key={blog.id}
                  blog={blog}
                /> 
              ))}
        </div>
      </div>
    );
  };



  const renderAllUsers = () => {

    if(!user){
      return <div>waiting for data fetch</div>
    }
    console.log(allUsers)


    return <div> 
    
      <h2>Users</h2>
        <table>
          <tr>
            <th>
            </th>
            <th>No of Blogs</th>
          </tr>
          <tr>
          <td>
          {allUsers.map(user => <div><Link to={`/users/${user.id}`} >{user.name}</Link></div> )}
          </td>
          <td>
          {allUsers.map(user => <div>{user.blogs.length}</div> )}
          </td>
         
          </tr>
        </table>
      </div>
  }
  

  



  const padding = {
    "padding": 5
  }

  return (<div>

      <div> 
        <Link style={padding} to='/'>blogs</Link>
        <Link style={padding} to='/users'>users</Link>
        {user && user.token && <span style= {padding}>{user.name} logged in
    <button onClick={handleLogout}> logout </button> </span>}
      </div>
      <h3>{notification}</h3>
    <h2>BLOGS</h2>
   

<Routes>
          <Route path='/users/:userid' element = { <BlogsByUser allUsers={allUsers} />} />
          <Route path='/:blogid' element= {<DetailedBlogPost   
                                            likeBlog={addLike} 
                                            deleteBlog={removeBlog} />} />
          <Route path='/users' element={renderAllUsers()} />
          <Route path='/' element={<div>{user && user.token ? renderBlogs() : renderLoginForm()}</div>} />
</Routes>
  </div>

  
  )
};

export default App;
