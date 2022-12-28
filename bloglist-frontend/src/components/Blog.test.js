import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title:'blog title',
    author:'blog author',
    url:'url.com'
  }

  render(<Blog blog={blog} />)

  const description = screen.queryByText('blog title blog author')
  const url = screen.queryByText('url.com')
  //const likes = screen.queryByText('0')

  expect(description).toBeDefined()
  expect(url).toBeNull()
  //expect(likes).toBeNull()
})

test('clicking the like button txice calls event handler twice', async () => {
  const blogToLike = {
    title:'blog to like',
    author:'likable',
    url:'twolikesplease.com'
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blogToLike} likeBlog={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)

  const likes = screen.queryByText('Likes: 2')
  expect(likes).toBeDefined()

})