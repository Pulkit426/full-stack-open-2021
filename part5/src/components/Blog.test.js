import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Testing Blog component: ', () => {

  test('renders blog title and author', async () => {

    const blog = {
      title: 'Blog for testing',
      author: 'Pulkit',
      url: 'blogs/testing',
      likes: 9
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog}  likeBlog={mockHandler} deleteBlog={mockHandler} />)


    const element= screen.getByText('Blog for testing by Pulkit')

    expect(element).toBeDefined()


  })

  test('Shows all info on clicking View button', async () => {

    const blog = {
      title: 'Blog for testing',
      author: 'Pulkit',
      url: 'blogs/testing',
      likes: 9
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog}  likeBlog={mockHandler} deleteBlog={mockHandler} />)


    const button = screen.getByText('View')
    fireEvent.click(button)

    const titleElement = screen.getByText('blogs/testing')
    const LikesElement = screen.getByText('likes 9')

    expect(titleElement).toBeDefined()
    expect(LikesElement).toBeDefined()

  })

  test('Like button clicked twice', async () => {

    const blog = {
      title: 'Blog for testing',
      author: 'Pulkit',
      url: 'blogs/testing',
      likes: 9
    }
    const mockLikeHandler = jest.fn()
    const mockHandler = jest.fn()

    render(<Blog blog={blog}  likeBlog={mockLikeHandler} deleteBlog={mockHandler} />)





    const button = screen.getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)



    expect(mockLikeHandler.mock.calls).toHaveLength(2)

  })

})
