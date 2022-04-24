const mongoose= require('mongoose')
const supertest= require('supertest')
const app= require('../app')
const api= supertest(app)
const Blog= require('../models/blog')
const helper = require('./tests_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
}, 100000)

describe('GET ' ,() => {


  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type',/application\/json/)
  }, 100000)

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
  }, 100000)

  test('id field is returned', async () => {
    const response= await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  }, 100000)

})

describe('POST ', () => {

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Async/Await',
      author: 'Pulkit',
      url: 'abc/AsyncAwait',
      likes: 62
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type',/application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)

    const titles=blogsAtEnd.map(b => b.title)
    expect(titles).toContain('Async/Await')
  }, 100000)

  test('by default likes are zero', async () => {
    const newBlog = {
      title: 'NewBlog',
      author: 'Pulkit',
      url: 'abc/NewBlog',
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type',/application\/json/)

    const response = await Blog.find({ title: 'NewBlog' })
    expect(response[0].likes).toBe(0)

  }, 100000)

  test('blog without title and url is not added', async () => {
    const newBlog = {
      author: 'Pulkit',
      likes:5
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await helper.blogsInDb()
    expect(response).toHaveLength(helper.initialBlogs.length)

  }, 100000)

})

describe('DELETE ', () => {
  test('succeeds with code 204  if id is valid', async () => {

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length-1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  }, 100000)
})

describe('PUT ', () => {
  test('a blog is updated with valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = 54

    await api.put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(201)
      .expect('Content-Type',/application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const updatedValue = await Blog.find({ title: blogToUpdate.title })
    expect(updatedValue[0].likes).toBe(54)

  })
})
afterAll(() => {
  mongoose.connection.close()
})