const mongoose= require('mongoose')
const supertest= require('supertest')
const app= require('../app')
const api= supertest(app)
const bcrypt = require('bcrypt')
const Blog= require('../models/blog')
const User = require('../models/user')
const helper = require('./tests_helper')

let token

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret',10)
  const user = new User({
    username: 'root',
    name: 'root',
    passwordHash
  })

  await user.save()

  const response = await api.post('/api/login')
    .send({ username: 'root', password: 'sekret' })

  token = response.body.token
}, 100000)


describe('GET ' ,() => {


  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type',/application\/json/)
  }, 100000)

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
    expect(response.body).toHaveLength(2)
  }, 100000)

  test('id field is returned', async () => {
    const response= await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    const response = await helper.blogsInDb()
    expect(response).toHaveLength(helper.initialBlogs.length)

  }, 100000)

  test('adding a blog fails without proper token', async () => {
    const newBlog = {
      title: 'NewBlog',
      author: 'Pulkit',
      url: 'abc/NewBlog',
    }

    const invalidToken = null

    const result =  await api.post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${invalidToken}`)
      .expect(401)
      .expect('Content-Type',/application\/json/)

    expect(result.body.error).toContain('invalid token')
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  }, 100000)

})

describe('DELETE ', () => {
  test('succeeds with code 204  if id is valid', async () => {

    const newBlog = {
      title: 'Async/Await',
      author: 'Pulkit',
      url: 'abc/AsyncAwait',
      likes: 62
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)

    const blogsAtStart = await helper.blogsInDb()
    const idToDelete = blogsAtStart[blogsAtStart.length-1].id

    await api.delete(`/api/blogs/${idToDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length-1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(newBlog.title)
  }, 100000)

  test('fails if the token is not valid', async () => {


    const newBlog = {
      title: 'Async/Await',
      author: 'Pulkit',
      url: 'abc/AsyncAwait',
      likes: 62
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)

    const blogsAtStart = await helper.blogsInDb()
    const idToDelete = blogsAtStart[blogsAtStart.length-1].id
    const invalidToken=null

    const result = await api.delete(`/api/blogs/${idToDelete}`)
      .set('Authorization', `Bearer ${invalidToken}`)
      .expect(401)

    expect(result.body.error).toContain('invalid token')
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

  }, 100000)

})

describe('PUT ', () => {
  test('a blog is updated with valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = 54

    await api.put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type',/application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const updatedValue = await Blog.find({ title: blogToUpdate.title })
    expect(updatedValue[0].likes).toBe(54)

  })
})

describe('WHEN THERE IS INITIALLY ONE USER IN DB', () => {


  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'PAg12',
      name: 'Pulkit Agrawal',
      password: 'salainen'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length+1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  }, 100000)

  test('creation fails with proper statuscode and message if username is already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  }, 100000)

  test('creation fails with proper statuscode and message if username is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'rt',
      name: 'user',
      password: 'salainen',
    }

    const result = await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be atleast 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  }, 100000)

  test('creation fails with proper statuscode and message if password is not given', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Pag123',
      name: 'user',
    }

    const result = await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('enter password ')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  }, 100000)

  test('creation fails with proper statuscode and message if password is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Pag13',
      name: 'user',
      password: 'sl'
    }

    const result = await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password should be atleast 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  }, 100000)
})

afterAll(() => {
  mongoose.connection.close()
})