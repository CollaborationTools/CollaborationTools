/// <reference types="cypress" />

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command that test space creation in different contexts.
       * @param {string} spaceName expected space name
       */
      handleSpaceCreation: (spaceName: string) => void
    }
  }
}

Cypress.Commands.add('handleSpaceCreation', (spaceName: string) => {
  cy.getId('space-name-field')
    .click()
    .blur()
    .parent()
    .should('contain.text', 'required')
  cy.getId('space-name-field')
    .type(spaceName)
    .blur()
    .parent()
    .should('not.contain.text', 'required')
  cy.getId('create-space').click()
  cy.url().should('match', /space\/.{36}/)
  cy.get('header').should('contain.text', spaceName)
})

export {}
