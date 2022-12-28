import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('Blog Form sends the right inputs', async () => {
  const expectedBlog = {
    title:'testing title...',
    author:'testing author...',
    url:'testing url...',
    likes: 0
  }
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  await user.type(inputs[0], 'testing title...')
  await user.type(inputs[1], 'testing author...')
  await user.type(inputs[2], 'testing url...')

  const sendButton = screen.getByText('add')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(expectedBlog.title)
  expect(createBlog.mock.calls[0][0].author).toBe(expectedBlog.author)
  expect(createBlog.mock.calls[0][0].url).toBe(expectedBlog.url)

})