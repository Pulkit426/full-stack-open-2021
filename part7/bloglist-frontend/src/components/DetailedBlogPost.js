
import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

  const DetailedBlogPost = (props) => {
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.users)
    const blogid = useParams().blogid
  const detailedBlog = blogid
  ? blogs.filter(blog => blog.id === blogid)
  : null


    console.log("INSIDE DETAILED BLOG", blogs, detailedBlog)
    return (
      <div>
        <h2>{detailedBlog[0].title} {detailedBlog[0].author}</h2>
        <a href="/">{detailedBlog[0].url}</a>
        <br />
       {detailedBlog[0].likes} likes <button onClick={() => props.likeBlog(detailedBlog[0].id)}> Like </button>
       <div>added by {detailedBlog[0].user.name}</div>
       {user.username === detailedBlog[0].user.username && (
          <button onClick={() => props.deleteBlog(detailedBlog[0].id)}> Delete </button>
        )}
      </div>
    )
  }

  export default DetailedBlogPost