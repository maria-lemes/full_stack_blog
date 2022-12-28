const Blog = ({blog,likeBlog,deleteBlog}) => {

  const handleLikeClick = (event) => {
    const newBlog = {
      ...blog,
      likes: blog.likes +1
    }
    likeBlog(newBlog)
   
  }

  const handleDeleteClick = (event) => {
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

export default Blog