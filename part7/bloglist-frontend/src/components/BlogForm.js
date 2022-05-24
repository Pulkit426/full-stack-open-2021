import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const BlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewBlog((prevBlog) => {
      return {
        ...prevBlog,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted");
    addBlog(newBlog);
  };

  return (
    <div>
      <h2>Create New </h2>

      <form onSubmit={handleSubmit}>
        <div>
          title{" "}
          <input
            id="title"
            type="text"
            name="title"
            placeholder="title input"
            value={newBlog.title}
            onChange={handleChange}
          />
        </div>

        <div>
          author{" "}
          <input
            id="author"
            type="text"
            name="author"
            placeholder="author input"
            value={newBlog.author}
            onChange={handleChange}
          />
        </div>

        <div>
          url{" "}
          <input
            id="url"
            type="text"
            name="url"
            placeholder="url input"
            value={newBlog.url}
            onChange={handleChange}
          />
        </div>

        <Button id="create-form" type="submit" variant="contained"  size="small" startIcon={<AddIcon />} >
          {" "}
          Create{" "}
        </Button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default BlogForm;
