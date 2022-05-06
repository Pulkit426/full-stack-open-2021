import React from "react"

const Blog = ({blog}) => {
  console.log('inside blog component')
  return (
  <div>
    {blog.title} {blog.author}
  </div>  
)}

export default Blog