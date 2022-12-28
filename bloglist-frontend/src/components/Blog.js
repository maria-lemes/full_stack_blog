import PropTypes from 'prop-types'

const Blog = ({ blog,likeBlog,deleteBlog }) => {

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
    <div>
      <p>
        {blog.title} {blog.author} Likes: {blog.likes} <button onClick={handleLikeClick}>like</button>
      </p>
      <button onClick={handleDeleteClick}>delete</button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog