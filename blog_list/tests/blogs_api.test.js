const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./blog_test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
},10000)



test('blog list is returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blog list returns all blogs', async () => {
        const response = await api.get('/api/blogs')
        
        expect(response.body).toHaveLength(helper.initialBlogs.length)
        
})

test('post creates a new blog', async () => {
    const newBlog = {
        title: "test blog",
        author: "Me",
        url: "Me.com",
        likes: 123
    }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const totalBlogsEnd = await helper.blogsInDb()
    
      const titles = totalBlogsEnd.map(r => r.title)
    
      expect(totalBlogsEnd).toHaveLength(helper.initialBlogs.length + 1)
      expect(titles).toContain("test blog")   
    

}, 100000)

test('blog list succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      
    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
})

test('blog list deletes a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToDelete = blogsAtStart[0]

    const resultBlog = await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
    )
  
    const titles = blogsAtEnd.map(r => r.title)
  
    expect(titles).not.toContain(blogToDelete.title)
})

test('blog list modifies likes given a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToModify = blogsAtStart[0]

    const resultBlog = await api
      .put(`/api/blogs/${blogToModify.id}`)
      .send({likes: blogToModify.likes +1 })
      .expect(200)
    
    const blogsAtEnd = await helper.blogsInDb()

    const blogUpdated = blogsAtEnd.find(r => r.id === blogToModify.id)
  
    expect(blogUpdated.likes).toEqual(blogToModify.likes + 1)
})


afterAll(() => {
mongoose.connection.close()
})