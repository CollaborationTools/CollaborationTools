describe('new visits', () => {
  before(() => {
    cy.visit('http://localhost:3000')
  })

  it('creating new org', () => {
    const orgName = 'Intergalactic Teleportation Industries'
    cy.getId('get-started').should('have.class', 'btn-primary').click()
    cy.url().should('contain', '/org')
    cy.getId('create-org').should('have.class', 'btn-primary').click()
    cy.getId('org-name')
      .click()
      .blur()
      .parent()
      .should('contain.text', 'required')
    cy.getId('org-name')
      .type(orgName)
      .blur()
      .parent()
      .should('not.contain.text', 'required')
    cy.getId('create-org').click()
    cy.url().should('match', /org\/.{36}/)
    cy.get('header').should('contain.text', orgName)
  })
})
