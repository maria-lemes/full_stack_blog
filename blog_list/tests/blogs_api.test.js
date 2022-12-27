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



afterAll(() => {
mongoose.connection.close()
})