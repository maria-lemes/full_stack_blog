const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const blogs = require('./blogs_list')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    blogs.map(async (blog) =>{
        let blogObject = new Blog(blog)
        await blogObject.save()
    })
})



test('blog list is returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blog list returns all blogs', async () => {
        const response = await api.get('/api/blogs')
    
        expect(response.body).toHaveLength(blogs.length)
}, 100000)


afterAll(() => {
mongoose.connection.close()
})