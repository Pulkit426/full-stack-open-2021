import React from "react"
import { useParams } from "react-router-dom"

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
        <h2>{detailedUser[0].name}</h2>
        {detailedUser[0].blogs.length===0 
        ? <h3>No Blogs added yet</h3>
        : <div>
        <h3>added blogs</h3>
        <ul>
        {detailedUser[0].blogs.map(blog => <li>{blog.title}</li>)}
        </ul>
        </div>}

        </div>

    )
  }

  export default BlogsByUser