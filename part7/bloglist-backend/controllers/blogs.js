const router = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

router.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

router.get('/:id', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blog)
})

router.post('/', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = request.user
  const blog = new Blog({ ...request.body, user: user.id })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

router.delete('/:id', async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete ) {
    return response.status(204).end()
  }

  if ( blogToDelete.user && blogToDelete.user.toString() !== request.user.id ) {
    return response.status(401).json({
      error: 'only the creator can delete a blog'
    })
  }

  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).end()
})

router.put('/:id', async (request, response) => {
  const { token, params, body } = request;
  const { id } = params || {};

  const entry = {
    title: body.title,
    author: body.author,
    url: body.url,
    content: body.content,
    likes: body.likes,
  };

    const blog = await Blog.findById(id);

    if (!blog) {
      return response.status(404).json({ error: 'blog not found' }).end();
    }

      const updatedEntry = await Blog.findByIdAndUpdate(id, entry, {
        new: true,
      });
      response.json(updatedEntry.toJSON());
  })

  router.post('/:id/comments', async (request,response) => {
    const id = request.params.id
    const { comment }= request.body

    if(typeof comment !== 'string'){
      return response.status(400).json({ error: 'Comment should be string' }).end()
    }

    const blog = await Blog.findById(id)
    blog.comments = blog.comments.concat(comment)

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)

  })
  
  router.get('/:id/comments', async (request, response) => {
    const id = request.params.id
    const blog = await Blog.findById(id)

    response.json(blog.comments) 
  })

module.exports = router