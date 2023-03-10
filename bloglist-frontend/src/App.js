import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ type, message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className = {type}>
      {message}
    </div>
  )
}


const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const [addMessage, setAddMessage] = useState(null)

  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(createdBlog => {
        console.log(createdBlog)
        setBlogs(blogs.concat(createdBlog).sort((a, b) => b.likes - a.likes))
        setAddMessage(
          `${createdBlog.title} was added to blogs list`
        )
        setTimeout(() => {
          setAddMessage(null)
        }, 5000)
      })
  }

  const likeBlog = (blogObject) => {
    blogService
      .update(blogObject.id, { likes:blogObject.likes })
      .then(updatedBlog => {
        const updatedBlogs = blogs.map(blog => {
          if(blog.id === updatedBlog.id){
            return{
              ...blog,
              likes: updatedBlog.likes
            }
          } else return blog
        })
        setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
      })
  }

  const deleteBlog = (blogObject) => {
    if(window.confirm(`Delete ${blogObject.title} ?`)){
      blogService
        .deleteBlog(blogObject.id)
        .then(setBlogs( blogs.filter(blog => blog.id !== blogObject.id)))
    }
  }


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setAddMessage(
        'Login failed: wrong username or password'
      )
      setTimeout(() => {
        setAddMessage(null)
      }, 5000)
      console.log('Wrong credentials')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedNoteappUser')
  }

  if(user === null){
    return(
      <div>
        <h2>login to application</h2>
        <Notification type='failedLogin' message={addMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
            <br/>
                password
            <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login' type="submit">login</button>
        </form>
      </div>
    )
  }else{
    return(
      <div>
        <h2>blogs</h2>
        <Notification type='addBlog' message={addMessage} />
        <p id='user'>
          {user.name} logged in
          <button onClick={handleLogout}>
          logout
          </button>
        </p>
        <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
          <h2>Create new blog</h2>
          <BlogForm createBlog={addBlog}/>
        </Togglable>
        <div id='published'>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog}/>
          )}
        </div>
      </div>
    )
  }
}

export default App
