import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'
import { setNotification } from "./notificationReducer";

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers : {
        setBlogs(state,action){
            return action.payload
        },

        appendBlog(state,action){
            const blog = action.payload
            return state.concat(blog)
        },

        filterBlog(state,action){
            const id= action.payload
            return state.filter(blog => blog.id!==Number(id))
        }
    }

})

export const {setBlogs, appendBlog, filterBlog } = blogsSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (newBlog) => {
    return async dispatch => {
        const blog = await blogService.create(newBlog)

        dispatch(appendBlog(blog))
        dispatch(setNotification(`${newBlog.title} by ${newBlog.author} added`))
 }
}

export const likeBlog = (id) => {
    return async dispatch => {
    const blogs = await blogService.getAll()
    const blogToUpdate = blogs.find((blog) => blog.id === id);
    console.log(blogToUpdate);
    if (blogToUpdate) {
        const likes = blogToUpdate.likes ? blogToUpdate.likes + 1 : 1;
        const updatedBlog = {
          ...blogToUpdate,
          likes,
        };
        console.log(updatedBlog);

        const response = await blogService.update(updatedBlog.id, updatedBlog);

        if (response) {
          const updatedBlogList = blogs.map((blog) =>
            blog.id === id ? updatedBlog : blog
          )
          dispatch(setBlogs(updatedBlogList))
          dispatch(setNotification(`Likes updated for ${blogToUpdate.title}`))
        }
    } 
}
}

export const deleteBlog = (id) =>{
    return async dispatch => {
                if (window.confirm("Do you want to delete this")) {
                  await blogService.remove(id);
                  const updatedBlogList = await blogService.getAll()
                  dispatch(setBlogs(updatedBlogList))
                  dispatch(setNotification("Deleted"))
              }
    }
}

export const commentOnBlog = (id, commentValue) => {
    return async dispatch => {
        const response = await blogService.addComment(id,{comment: commentValue})
        const updatedBlogList = await blogService.getAll()
        dispatch(setBlogs(updatedBlogList))
        dispatch(setNotification(`Comment - '${commentValue}' added`))

    }
}

export default blogsSlice.reducer