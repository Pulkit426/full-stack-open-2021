
import React from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Button, TextField, Card,CardContent, Typography, Box,Link } from "@mui/material"
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
const randomMC = require('random-material-color');

  const DetailedBlogPost = (props) => {
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.users)
    const blogid = useParams().blogid
  const detailedBlog = blogid
  ? blogs.filter(blog => blog.id === blogid)
  : null

  const [comment,setComment] = useState("")


    console.log("INSIDE DETAILED BLOG", blogs, detailedBlog)
    return (
      <div>
      <div style={{display:"flex", justifyContent: "center"}}>
      
        <Card elevation={5}  sx={{maxHeight: 600, width: 500, maxWidth: 600}} >
          <CardContent>
          <Typography variant="h3" >
            {detailedBlog[0].title}
            </Typography>
            <Typography variant="caption" >
            {detailedBlog[0].author}
            </Typography>
            <Typography variant="body1" >
              {detailedBlog[0].content}              
            </Typography>

            <Typography variant="body2" >
              <Link underline="none" style={{cursor: "pointer"}}>{detailedBlog[0].url}   </Link>            
            </Typography>

            <Typography variant="body1" color="secondary" >
            Added by <span style={{backgroundColor: "cyan"}} > {detailedBlog[0].user.name}  </span>          
            </Typography>

       {detailedBlog[0].likes} likes 
       <Button 
       onClick={() => props.likeBlog(detailedBlog[0].id)}
       variant="outlined"
       startIcon={<ThumbUpAltIcon />} 
       color="primary" /> 

        <div>
        {user.username === detailedBlog[0].user.username && (
          <Button onClick={() => props.deleteBlog(detailedBlog[0].id)}
                   startIcon={<DeleteIcon />}
                   variant="outlined"
                   color="error" /> )}
        </div>
            
    </CardContent>

    </Card>
    </div>

    <div>
         <Typography variant="h4" align="center" component="div" sx={{m: "1rem"}}> Comments:  </Typography>

        
<div  style={{display:"flex", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>

        <TextField 
        sx = {{m: "1.5rem"}}
        color="secondary" 
        type="text" 
        placeholder="comment"
        value={comment} 
        onChange={({ target }) => setComment(target.value)} />
        <span>
        <Button onClick={() => {
          setComment('')
          return props.commentBlog(detailedBlog[0].id, comment)}} variant="outlined" color="primary"> Post Comment </Button>
        </span>
        
      </div>
      
      <Box sx={{display:"flex", justifyContent: "center", alignItems: "center", flexDirection:"column"}}>
      {detailedBlog[0].comments.map(comment => {
        var color = randomMC.getColor();
return (
  <ul >
    <Typography variant="body1" align="center" component="div" sx = {{backgroundColor: color, width: 400, alignItems: "center"}}>
        {comment}
        
      </Typography>
  </ul>
     
      )}
  )}

</Box>


     
  </div>

    </div>
    )
  }

  export default DetailedBlogPost