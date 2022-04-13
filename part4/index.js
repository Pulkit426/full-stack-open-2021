const express = require('express')
const app =express()
app.use(express.json())

let blogs = [
  {
    title: "Coding",
    author: "Pulkit",
    url: "abc/coding",
    likes: 10
  },
  {
    title: "Reading",
    author: "Pulkit",
    url: "abc/reading",
    likes: 8

  }
]

app.get('/',(request,response) => {
    response.send('<h1>Hello World </h1>')
})

app.get('/api/blogs', (request,response) => {
    response.json(blogs)
})

app.get('/api/blogs/:title', (request,response) => {
    const title = request.params.title
    const blog= blogs.find(blog => blog.title === title)

    if(blog)
    response.json(blog)
    else
    response.status(404).end()
})

app.delete('/api/blogs/:title', (request,response) => {
    const title= request.params.title
    blogs = blogs.filter(blog => blog.title!=title)

    response.status(204).end()
})

app.post('/api/blogs', (request,response) => {
    const body= request.body

    if(!body.title){
        return response.status(404).json({
            "error": "content missing"
        })
    }

    const blog = {
        title : body.title,
        author: "Pulkit",
        url : `abc/${body.title}`,
        likes: body.likes
    }
    
    blogs = blogs.concat(blog)
    response.json(blog)
})

const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})