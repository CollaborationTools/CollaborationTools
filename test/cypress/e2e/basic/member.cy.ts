/* eslint-disable sonarjs/no-duplicate-string */
import member1 from 'cypress/fixtures/userStorage/member-1'

const memberOrganisations = member1.get('organisations')
const memberRecentOrganisations = member1.get('recentOrganisations')

const currentOrgId = memberRecentOrganisations ? memberRecentOrganisations[0] ?? '' : ''
const currentOrgName = memberOrganisations ? memberOrganisations.get(currentOrgId)?.name ?? '' : ''
const nextOrgId = memberRecentOrganisations ? memberRecentOrganisations[1] ?? '' : ''
const nextOrgName = memberOrganisations ? memberOrganisations.get(nextOrgId)?.name ?? '' : ''

const newOrgName = 'Org 4'

describe('a member can', () => {
  beforeEach(() => {
    cy.setUserStorage(member1)
    cy.visit('/')
  })

  it('browse existing orgs', () => {
    cy.url().should('contain', '/org/' + currentOrgId)
    cy.getId('org-name').should('contain.text', currentOrgName).click()
    cy.getUUID(nextOrgId).should('contain.text', nextOrgName).click()
    cy.url().should('contain', '/org/' + nextOrgId)
    cy.getId('org-name').should('contain.text', nextOrgName)
  })

  it('create another org', () => {
    cy.getId('org-name').should('be.visible').click()
    cy.getId('create-new-org').click()
    cy.url().should('contain', '/org/new')
    cy.handleOrgCreation(newOrgName)
  })
})
