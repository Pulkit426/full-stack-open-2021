import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const BlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    content: "",
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
          
          <TextField variant="outlined"
            id="title"
            type="text"
            name="title"
            placeholder="Title"
            value={newBlog.title}
            onChange={handleChange}
          />
        </div>

        <div>

        <TextField variant="outlined"
            id="author"
            type="text"
            name="author"
            placeholder="Author"
            value={newBlog.author}
            onChange={handleChange}
          />
        </div>

        <TextField variant="outlined"
            id="content"
            type="text"
            name="content"
            placeholder="Content"
            value={newBlog.content}
            onChange={handleChange}
          />

        <div>
        <TextField variant="outlined"
            id="url"
            type="text"
            name="url"
            placeholder="URL"
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
