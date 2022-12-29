import { useState } from 'react'
const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  return (
    <div id='blogForm'>
      <form onSubmit={addBlog}>
        <div>
          title: <input
            id="title"
            value={newTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author: <input
            id="author"
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url: <input
            id="url"
            value={newUrl}
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm