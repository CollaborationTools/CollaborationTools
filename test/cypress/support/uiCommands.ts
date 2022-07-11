/// <reference types="cypress" />

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-id attribute.
       *
       * Optionally you can pass *false* as a second argument to select non-visible element.
       * @param {string} dataId element's data-id
       * @param {boolean} visible=true determines if only visible elements will be returned
       * @example cy.getId('get-started')
       * @example cy.getId('a-hidden-field', false)
       */
      getId: (dataId: string, visible?: boolean) => Chainable<JQuery>
      /**
       * Custom command to select DOM element by data-id attribute.
       *
       * Optionally you can pass *false* as a second argument to select non-visible element.
       * @param {string} dataUUID element's data-id
       * @param {boolean} visible=true determines if only visible elements will be returned
       * @example cy.getId('954346a2-f110-4db9-9b95-08d3844edc86')
       * @example cy.getId('954346a2-f110-4db9-9b95-08d3844edc86', false)
       */
      getUUID: (dataUUID: string, visible?: boolean) => Chainable<JQuery>
    }
  }
}

Cypress.Commands.add('getId', (dataId: string, visible = true) => {
  return cy.get(`[data-id="${dataId}"]${visible && ':visible'}`)
})

Cypress.Commands.add('getUUID', (dataUUID: string, visible = true) => {
  return cy.get(`[data-uuid="${dataUUID}"]${visible && ':visible'}`)
})

export {}
