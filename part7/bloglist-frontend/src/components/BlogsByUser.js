import React from "react"
import { useParams } from "react-router-dom"
import { Typography,Card,Table, TableBody, TableHead, TableRow, TableCell } from "@mui/material"

  const BlogsByUser = (props) => {

    const userid = useParams().userid
  const detailedUser =  userid 
  ? props.allUsers.filter(user => user.id === userid)
  : null

    console.log("INSIDE BLOG BY USER",props.allUsers, detailedUser)

    if(!detailedUser){
      return <div>Waiting for fetch</div>
    }

    return (
      <div>
        <Typography align="center" variant="h4"> {detailedUser[0].name} </Typography>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "1.5rem"}}>
      <Card align="center" sx={{width: 300}}> 
      {detailedUser[0].blogs.length===0 
        ? <Typography align="center" variant="body1">No Blogs added yet </Typography>
        :  <Table>

          <TableHead>
            <TableRow>
              <TableCell> <Typography align="center" variant="body1">Added Blogs </Typography> </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
          {detailedUser[0].blogs.map(blog => (
          <TableRow key={blog.id}>
            <TableCell component="th" scope="row" align="center">{blog.title} </TableCell> 
          </TableRow>))}
            
          </TableBody>
       
       
          
        </Table>
        }

      </Card>
      </div>

      </div>

    )
  }

  export default BlogsByUser