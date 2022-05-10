// blog_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST','http://localhost:3003/api/testing/reset')

    const user= {
      name: 'Pulkit Agrawal',
      username: 'Pulkit426',
      password: 'salainen'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form can be shown', function() {
    cy.contains('login')
    cy.contains('Username')
    cy.contains('Password')

  })

  describe('Login', function (){

    it('succeeds with correct credentials', function (){
      cy.get('#username').type('Pulkit426')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Pulkit Agrawal logged in')

    })

    it('fails with wrong credentials', function(){
      cy.get('#username').type('Pulkit426')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('invalid username or password')

    })
  })


  describe('When Logged in ', function(){

    beforeEach(function(){
      cy.login({ username: 'Pulkit426',
        password:'salainen' })

    })

    it('A Blog can be created', function(){
      cy.contains('Create New Blog').click()
      cy.get('#title').type('Testing Blog')
      cy.get('#author').type('Pulkit Agrawal')
      cy.get('#url').type('http://blogs.com/testingblog')
      cy.get('#create-form').click()

      cy.contains('Testing Blog by Pulkit Agrawal added')
      cy.get('#blogListWrapper')
        .children()
        .should('have.length',1)

    })

    describe('A Blog exists', function() {

      beforeEach(function(){
        cy.createBlog({
          title: 'First Testing Blog',
          author: 'Pulkit Agrawal',
          url: 'http://blogs.com/testingblog',
          likes: 3
        })

        cy.createBlog({
          title: 'Second Testing Blog',
          author: 'Pulkit Agrawal',
          url: 'http://blogs.com/testingblog',
          likes: 6
        })

      })

      it('blog is liked on clicking like button', function(){

        cy.contains('First Testing Blog')
          .contains('View')
          .click()

        cy.contains('First Testing Blog')
          .contains('Like')
          .click()

        cy.contains('First Testing Blog')
          .contains('likes 4')


      })

      it('blog is deleted by user who created it', function (){
        cy.contains('First Testing Blog')
          .contains('View')
          .click()

        cy.contains('First Testing Blog')
          .contains('Delete')
          .click()

        cy.contains('Deleted')
      })

      it('blogs are sorted based on likes', function(){

        cy.get('.blog').eq(0).should('contain', 'Second Testing Blog')
        cy.get('.blog').eq(1).should('contain', 'First Testing Blog')

      })
    })
  })

})