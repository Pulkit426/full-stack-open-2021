// eslint-disable-next-line no-unused-vars
import './App.css'
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
import { initializeBlogs, createBlog, likeBlog, deleteBlog , commentOnBlog } from './reducers/blogsReducer'
import { initializeUsers, login,logout } from "./reducers/usersReducer";
import {
  BrowserRouter as Router,
  Routes, Route, Link, useMatch, useParams, useNavigate
} from "react-router-dom"

import BlogsByUser from "./components/BlogsByUser";
import DetailedBlogPost from "./components/DetailedBlogPost";
import 'fontsource-roboto'
import { Button, Card } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { Container } from '@mui/material';
import { AppBar,Toolbar,Stack, Typography, Table,TableContainer, TableRow, TableHead, TableBody, TableCell, Paper } from '@mui/material';


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

  const addComment = async (id,comment) => {
    try {
      console.log("INSIDE ADD COMMENT")
      dispatch(commentOnBlog(id,comment))
    } 
    catch (error) {
      dispatch(setNotification(`${error.response.data.error}`))
      console.warn(error);
    }
  }

  const renderLoginForm = () => {
    return (
      <div>
        
        <Container maxWidth='sm' style={{backgroundColor:'cyan'}}>
        <Typography align="center" gutterBottom="true" variant="h1">
            TerraPost
          </Typography> 
          
          <Typography align="center" gutterBottom="true" variant="body1">
        Log in to application
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
        </Typography>
        </Container>
      </div>
    );
  };

  const renderBlogs = () => {
    return (
      <div>
        <h2> Blogs </h2>
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
    
    <Typography align="center" variant="h4"> Users </Typography>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "1.5rem"}}>
      <Card sx={{width: 300}}> 
      <TableContainer component={Paper}>
 
        <Table  align="center" sx={{ width: 300 }} size="medium" >
          <TableHead>
            <TableRow>
              <TableCell align="center"> USERNAME </TableCell>
              <TableCell align="center"> NO OF BLOGS</TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
        {allUsers.map(user => (
        <TableRow key={user.username} >
         <TableCell component="th" scope="row" align="center" sx = {{ '&:hover': {backgroundColor: '#D9AFD9'} }} >
         <Link style={{textDecoration: "none", color: "gray"}} to={`/users/${user.id}`} >{user.username}</Link>
         </TableCell>
         <TableCell align="center">
         {user.blogs.length}
         </TableCell>
         </TableRow>
        ))}

        </TableBody>
        </Table>
        </TableContainer>

        </Card>
        </div>
      </div>
  }
  

  



  const padding = {
    "padding": 5
  }

  return (<div>

      <div> 
       {user && user.token && 
       <AppBar position='static' sx={{backgroundColor: "#93c5fd"}}>
         <Toolbar>

         <Typography variant="h5" component="div" style = {{ margin: 10}}> TERRAPOST </Typography>
        
           <Stack direction="row" spacing={2}>
           <Button component={Link}  color="inherit" underline="none" to='/'>blogs</Button>
        <Button component={Link} color="inherit"  underline="none" to='/users'>users</Button>
        </Stack>
        <Typography variant="h6" component="div" style={{flex: 1}} > </Typography>
        <Stack direction="row" spacing={2}>
       <div>{user.name} logged in</div>
 
    <Button endIcon={<LogoutIcon />} variant="outlined" sx={{color: "#7f1d1d"}} onClick={handleLogout}> logout </Button>

            </Stack> 
         

        </Toolbar>
       </AppBar>}

      </div>
      <h3>{notification}</h3>
   

<Routes>
          <Route path='/users/:userid' element = { <BlogsByUser allUsers={allUsers} />} />
          <Route path='/:blogid' element= {<DetailedBlogPost   
                                            likeBlog={addLike} 
                                            deleteBlog={removeBlog} 
                                            commentBlog={addComment} />} />
          <Route path='/users' element={renderAllUsers()} />
          <Route path='/' element={<div>{user && user.token ? renderBlogs() : renderLoginForm()}</div>} />
</Routes>

  </div>

  
  )
};

export default App;
