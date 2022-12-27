import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({type, message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className = {type}>
      {message}
    </div>
  )
}

const BlogForm = ({blogs,setBlogs,newTitle,setNewTitle,newAuthor,setNewAuthor,newUrl, setNewUrl,setAddMessage ,setAddBlogVisible}) => {
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    }
    
    blogService
      .create(blogObject)
        .then(createdBlog => {
          console.log(createdBlog)
            setBlogs(blogs.concat(createdBlog))
            setNewTitle('')
            setNewAuthor('')
            setNewUrl('') 
            setAddMessage(
              `${createdBlog.title} was added to blogs list`
            )
            setTimeout(() => {
              setAddMessage(null)
            }, 5000)      
        })       
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
    <div>
    <form onSubmit={addBlog}>
        <div>
          title: <input
           value={newTitle}
           onChange={handleTitleChange}
           />
        </div>
        <div>
          author: <input
          value={newAuthor}
          onChange={handleAuthorChange} 
          />
        </div>
        <div>
          url: <input
          value={newUrl}
          onChange={handleUrlChange} 
          />
        </div>
        <div>
          <button type="submit" onClick={() => setAddBlogVisible(false)}>add</button>
        </div>
      </form>
      <button onClick={() => setAddBlogVisible(false)}>cancel</button>
      </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const [addMessage, setAddMessage] = useState(null)
  const [addBlogVisible, setAddBlogVisible] = useState(false)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
        `Login failed: wrong username or password`
      )
      setTimeout(() => {
        setAddMessage(null)
      }, 5000)
      console.log('Wrong credentials')
    }
  }

  const handleLogout = async (event) =>{
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedNoteappUser')
  }

  if(user == null){
    return(
      <div>
         <h2>login to application</h2>
           <Notification type='failedLogin' message={addMessage} />
            <form onSubmit={handleLogin}>
              <div>
                username
                  <input
                  type="text"
                  value={username}
                  name="Username"
                  onChange={({ target }) => setUsername(target.value)}
                />
                <br/>
                password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
                />
              </div>
              <button type="submit">login</button>
            </form>
      </div>
    )
  }else{
    const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: addBlogVisible ? '' : 'none' }
    return(
      <div>
        <h2>blogs</h2>
        <Notification type='addBlog' message={addMessage} />
        <p>
        {user.name} logged in 
        <button onClick={handleLogout}>
        logout
        </button>
        </p>
        <button style= {hideWhenVisible} onClick={() => setAddBlogVisible(true)}>
          Add new blog
        </button>
        <div style= {showWhenVisible}>
          <h2>Create new blog</h2>
          <BlogForm blogs={blogs} setBlogs={setBlogs} newTitle={newTitle} setNewTitle={setNewTitle}
           newAuthor={newAuthor} setNewAuthor={setNewAuthor} newUrl={newUrl} setNewUrl={setNewUrl} 
           setAddMessage={setAddMessage} setAddBlogVisible={setAddBlogVisible} />
        </div>
        <div style= {hideWhenVisible}>
          <h2>Published blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      </div>
    )
    
  }
}

export default App
