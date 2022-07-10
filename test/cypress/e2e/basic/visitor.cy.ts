describe('a visitor can', () => {
  before(() => {
    cy.visit('/')
  })

  it('create new org', () => {
    const orgName = 'Intergalactic Teleportation Industries'
    cy.getId('get-started').should('have.class', 'btn-primary').click()
    cy.url().should('contain', '/get-started')
    cy.getId('create-org').should('have.class', 'btn-primary').click()
    cy.handleOrgCreation(orgName)
  })
})
