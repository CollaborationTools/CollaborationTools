/* eslint-disable sonarjs/no-duplicate-string */
import member1 from 'cypress/fixtures/userStorage/member-1'

const memberOrganisations = member1.get('organisations')
const memberRecentOrganisations = member1.get('recentOrganisations')
const currentOrgId = memberRecentOrganisations[0]
const orgName = 'Org 4'

describe('a member can', () => {
  beforeEach(() => {
    cy.setUserStorage(member1)
    cy.visit('/')
  })

  it('create another org', () => {
    cy.url().should('contain', '/org/' + currentOrgId)
    cy.getId('org-name')

      .should('contain.text', memberOrganisations.get(currentOrgId).name)
      .click()

    cy.getId('create-new-org').click()
    cy.url().should('contain', '/org/new')
    cy.handleOrgCreation(orgName)
  })
})
