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
    it('fails with wrong credentials', function() {
      cy.get('#username').type('testfail')
      cy.get('#password').type('testpwd')
      cy.get('#login').click()
      cy.contains('Login failed:')
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpwd')
      cy.get('#login').click()
      cy.contains('test user logged in')
    })

  })

})