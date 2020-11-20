describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset') // resets the db
    cy.visit('http://localhost:3000')
    // create the new account
    cy.contains('login').click()
    cy.get('#username').type('admin')
    cy.get('#password').type('admin')
    cy.get('#register-button').click()
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', () => {
    cy.contains('login')
  })

  describe('testing the login', () => {
    it('login works', () => {
      cy.contains('login').click()
      cy.get('#username').type('admin')
      cy.get('#password').type('admin')
      cy.get('#login-button').click()
      cy.contains('admin is logged in')
    })

    it('failed login', () => {
      cy.contains('login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.get('.notification > div')  // get the div tag inside
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'admin is logged in')
    })
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'admin', password: 'admin' })
      cy.contains('admin is logged in')
    })

    it('posting a new blog', () => {
      cy.contains('new blog').click()
      cy.get('#title').type('Title of me blog')
      cy.get('#author').type('Author')
      cy.get('#url').type('url.com')
      cy.get('#create-blog-button').click()
      cy.contains('Title of me blog')
    })

    describe('test after a blog is posted', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'Title of me blog',
          author: 'Author',
          url: 'url.com',
        })
        cy.contains('Title of me blog')
      })

      it('liking the previous blog', () => {
        cy.contains('view').click()
        cy.contains('likes: 0')
          .contains('like').click()
        cy.contains('likes: 1')
      })

      it('deleting the blog', () => {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'Title of me blog')
      })
    })

    describe('multiple blogs are posted', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'Title of me blog',
          author: 'Author',
          url: 'url.com',
        })
        cy.createBlog({
          title: 'Title of me blog2',
          author: 'Author2',
          url: 'url2.com',
        })
      })

      it.only('they are sorted by likes', () => {
        cy.contains('Title of me blog2').parent().as('blog2')
        cy.get('@blog2').contains('view').click()
        cy.contains('likes: 0')
          .contains('like').click()
        cy.contains('likes: 1')
        cy.visit('http://localhost:3000')

        cy.get('.blog').then((blogs) => {
          cy.wrap(blogs[0]).contains('Title of me blog2')
        })
      })
    })
  })
})