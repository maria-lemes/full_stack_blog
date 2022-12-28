const Blog = ({blog,likeBlog}) => {

  const handleLikeClick = (event) => {
    const newBlog = {
      ...blog,
      likes: blog.likes +1
    }
    likeBlog(newBlog)
   
  }

  return(
  <div>
    <p>
    {blog.title} {blog.author} Likes: {blog.likes} <button onClick={handleLikeClick}>like</button>
    </p>
  </div>  
  )
  }

export default Blog