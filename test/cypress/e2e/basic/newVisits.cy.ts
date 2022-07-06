describe('new visits', () => {
  before(() => {
    cy.visit('http://localhost:3000')
  })

  it('creating new org', () => {
    cy.getId('get-started').should('have.class', 'btn-primary').click()
    cy.url().should('contain', '/org')
    cy.getId('create-org').should('have.class', 'btn-primary').click()
    cy.getId('org-name')
      .click()
      .blur()
      .parent()
      .should('contain.text', 'required')
    cy.getId('org-name')
      .type('Intergalactic Teleportation Industries')
      .blur()
      .parent()
      .should('not.contain.text', 'required')
    cy.getId('create-org').click()
    cy.url().should('match', /org\/.{36}$/)
  })
})
