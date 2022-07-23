/* eslint-disable sonarjs/no-duplicate-string */
import member1 from 'cypress/fixtures/userStorage/member-1'

const memberOrganisations = member1.get('organisations')
const memberRecentOrganisations = member1.get('recentOrganisations')
const memberProfile = member1.get('me')
const memberAllOrgsMembers = member1.get('org-members')

const currentMemberId = memberProfile?.id ?? ''
const currentMemberName = memberProfile?.name ?? ''
const currentOrgId = memberRecentOrganisations[0] ?? ''
const currentOrgName = memberOrganisations.get(currentOrgId)?.name ?? ''
const currentDisplayName =
  memberAllOrgsMembers.get(currentOrgId)?.get(currentMemberId)?.name ?? ''
const nextOrgId = memberRecentOrganisations[1] ?? ''
const nextOrgName = memberOrganisations.get(nextOrgId)?.name ?? ''

const newOrgName = 'Org 4'

describe('a member can', () => {
  beforeEach(() => {
    cy.setUserStorage(member1)
    cy.visit('/')
  })

  it('browse and join existing orgs', () => {
    cy.url().should('contain', '/org/' + currentOrgId)
    cy.getId('navigation-links').contains('Team').click()
    cy.getId('members').should('contain.text', currentDisplayName)
    cy.getId('org-name').should('contain.text', currentOrgName).click()
    cy.getUUID(nextOrgId).should('contain.text', nextOrgName).click()
    cy.url().should('contain', '/org/' + nextOrgId)
    cy.getId('org-name').should('contain.text', nextOrgName)
    cy.getId('navigation-links').contains('Team').click()
    cy.getId('join-now').click()
    cy.getId('members').should('contain.text', currentMemberName)
  })

  it('create another org', () => {
    cy.getId('org-name').should('be.visible').click()
    cy.getId('create-new-org').click()
    cy.url().should('contain', '/org/new')
    cy.handleOrgCreation(newOrgName)
  })

  it('create user profile and join organisation')
})
