describe('new visits', () => {
  before(() => {
    cy.visit('http://localhost:3000')
  })

  it('creating new org', () => {
    cy.getId('get-started').should('have.class', 'btn-primary')
  })
})
