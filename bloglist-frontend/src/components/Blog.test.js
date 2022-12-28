import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title:'blog title',
    author:'blog author',
    url:'url.com'
  }

  render(<Blog blog={blog} />)

  const description = screen.getByText('blog title blog author')
  const url = screen.queryByText('url.com')
  const likes = screen.queryByText('0')

  expect(description).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})