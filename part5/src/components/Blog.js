import React, { useState } from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line no-unused-vars
const Blog = ({ blog, likeBlog, deleteBlog, user }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible,setVisible] = useState(false)
  const showVisible = { display : visible ? '' : 'none' }

  const toggle = () => {
    setVisible(prevVisible => !prevVisible)
  }

  return (
    <div style={blogStyle}>
      {blog.title} by  {blog.author}
      <button onClick={toggle}> {visible ? 'hide' : 'View'} </button>

      <div style={showVisible}>
        {blog.url} <br />
      likes {blog.likes} <button onClick={likeBlog}>Like</button> <br />
        {/* {blog.user.name} <br /> */}
        {console.log(blog.user)}


        <button onClick={deleteBlog}> Delete </button>

      </div>
    </div>

  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog