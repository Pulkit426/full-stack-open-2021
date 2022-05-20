import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };



  return (
    <div style={blogStyle} className="blog">
      <Link to={`/${blog.id}`} >{blog.title} by {blog.author}</Link>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog;
