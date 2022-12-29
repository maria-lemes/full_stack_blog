import { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog,likeBlog,deleteBlog }) => {

  const [detailsVisible, setDetailsVisible] = useState(false)

  //const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  //const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  const handleLikeClick = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes +1
    }
    likeBlog(newBlog)
  }

  const handleDeleteClick = () => {
    deleteBlog(blog)
  }

  return(
    <div className='blog' style={blogStyle}>
      <p>
        {blog.title} {blog.author}
        {!detailsVisible && <button onClick={() => setDetailsVisible(true)}>view</button>}
        {detailsVisible && <button  onClick={() => setDetailsVisible(false)}>hide</button>}
      </p>
      {detailsVisible &&
      <div id='details' >
        <p> Likes: {blog.likes} <button onClick={handleLikeClick}>like</button></p>
        <p> {blog.url} </p>
        <button onClick={handleDeleteClick}>delete</button>
      </div>
      }
    </div>
  )
}


export default Blog