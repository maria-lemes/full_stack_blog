const dummy = require('../utils/list_helper')
// const Blog = require('./models/blog')
// const blogs = Blog.find({})

// test('dummy test', () => {
//     const result = dummy(blogs)
  
//     expect(result).toBe(1)
// })

const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})