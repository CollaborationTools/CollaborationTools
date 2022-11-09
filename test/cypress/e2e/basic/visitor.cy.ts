describe('a visitor can', () => {
  before(() => {
    cy.visit('/')
  })

  it('create new space', () => {
    const spaceName = 'Intergalactic Teleportation Industries'
    cy.getId('get-started').should('have.class', 'btn-primary').click()
    cy.url().should('contain', '/get-started')
    cy.getId('create-space').should('have.class', 'btn-primary').click()
    cy.handleSpaceCreation(spaceName)
  })
})
