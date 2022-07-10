/// <reference types="cypress" />

import { UserStorage, serialize } from 'cypress/support/storage'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Loads user data into the browser to set initial state.
       * @param {UserStorage} userStorage
       */
      setUserStorage: (userStorage: UserStorage) => void
    }
  }
}

Cypress.Commands.add('setUserStorage', (userStorage: UserStorage) => {
  Array.from(userStorage).forEach((item) => {
    localStorage.setItem(item[0], serialize(item[1]))
  })
})

export {}
