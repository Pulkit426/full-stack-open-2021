const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Exams',
    author: 'Pulkit',
    url: 'abc/Exam',
    likes: 22,
    id: '625856da8bc1242eb6cfb992'
  },
  {
    title: 'Coding',
    author: 'Pulkit',
    url: 'abc/Coding',
    likes: 25,
    id: '6258576a216e074484d9c0a1'
  },
]


const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', likes: 25 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}