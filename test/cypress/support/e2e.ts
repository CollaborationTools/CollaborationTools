import './formCommands'
import './storageCommands'
import './uiCommands'
import 'cypress-real-events/support'

// as long as reactive localStorage is used in the app exceptions should not fail tests
// issue occurs because Cypress automatically clears localStorage in between test cases
Cypress.on('uncaught:exception', () => {
  return false
})
