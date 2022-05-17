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
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogsReducer'
import { initializeUsers, login,logout } from "./reducers/usersReducer";

const App = () => {
  const blogs = useSelector(state => state.blogs)
  console.log(blogs)
 const user = useSelector(state => state.users)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

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
        <h1>{notification}</h1>
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
        <h2>BLOGS</h2>
        <h1>{notification}</h1>
        {user.name} logged in
        <button onClick={handleLogout}> logout </button>
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
                  likeBlog={() => addLike(blog.id)}
                  deleteBlog={() => removeBlog(blog.id)}
                  user={user}
                />
              ))}
        </div>
      </div>
    );
  };

  return <div>{user && user.token ? renderBlogs() : renderLoginForm()}</div>;
};

export default App;
