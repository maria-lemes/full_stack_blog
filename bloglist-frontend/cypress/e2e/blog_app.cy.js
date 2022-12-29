describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test user',
      username: 'testuser',
      password: 'testpwd'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login to application')
    cy.get('form').contains('username')
    cy.get('form').contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpwd')
      cy.get('#login').click()
      cy.get('#user').should('contain','test user logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testfail')
      cy.get('#password').type('testpwd')
      cy.get('#login').click()
      cy.contains('Login failed:')
    })

  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpwd')
      cy.get('#login').click()
    })

    it('A blog can be created', function() {
      cy.contains('Add new blog').click()
      cy.get('#title').type('title cypress')
      cy.get('#author').type('author cypress')
      cy.get('#url').type('cypress.com')
      cy.contains('add').click()
      cy.contains('title cypress author cypress')
    })
    describe('when the blog is created', function(){
      beforeEach(function() {
        cy.contains('Add new blog').click()
        cy.get('#title').type('title cypress')
        cy.get('#author').type('author cypress')
        cy.get('#url').type('cypress.com')
        cy.contains('add').click()
      })

      it('the user can like a blog', function(){
        cy.contains('title cypress author cypress').contains('like').click()
        cy.contains('title cypress author cypress Likes: 1')
      })

      it('the user can delete a blog', function(){
        cy.contains('title cypress author cypress').parent().contains('delete').click()
        cy.get('#published').should('not.contain','title cypress author cypress')
      })

    })
  })


})