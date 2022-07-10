/// <reference types="cypress" />

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command that test org creation in different contexts.
       * @param {string} orgName expected org name
       */
      handleOrgCreation: (orgName: string) => void
    }
  }
}

Cypress.Commands.add('handleOrgCreation', (orgName: string) => {
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

export {}
