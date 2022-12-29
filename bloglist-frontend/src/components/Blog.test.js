import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title:'blog title',
    author:'blog author',
    url:'url.com',
    likes: 0
  }

  render(<Blog blog={blog} />)

  const description = screen.queryByText('blog title blog author')
  const url = screen.queryByText('url.com')
  const likes = screen.queryByText('Likes: 0')

  expect(description).toBeDefined()
  expect(url).not.toBeVisible()
  expect(likes).not.toBeVisible()
})

test('view blog details', async () => {
  const blogToLike = {
    title:'blog to view',
    author:'review',
    url:'checkme.com',
    likes: 0
  }


  const mockHandler = jest.fn()

  render(
    <Blog blog={blogToLike} likeBlog={mockHandler} />
  )

  const user = userEvent.setup()
  const buttonView = screen.getByText('view')
  await user.click(buttonView)

  const url = screen.queryByText('checkme.com')
  const likes = screen.queryByText('Likes: 0')

  expect(url).toBeVisible()
  expect(likes).toBeVisible()

})

test('clicking the like button txice calls event handler twice', async () => {
  const blogToLike = {
    title:'blog to like',
    author:'likable',
    url:'twolikesplease.com',
    likes: 0
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blogToLike} likeBlog={mockHandler} />
  )

  const user = userEvent.setup()
  const buttonView = screen.getByText('view')
  await user.click(buttonView)

  const buttonLike = screen.getByText('like')
  await user.click(buttonLike)
  await user.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(2)

  const likes = screen.queryByText('Likes: 2')
  expect(likes).toBeDefined()

})