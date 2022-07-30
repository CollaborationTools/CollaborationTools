/// <reference types="cypress-real-events" />
/* eslint-disable sonarjs/no-duplicate-string, promise/catch-or-return */

import {
  ORGANISATIONS_KEY,
  RECENT_ORGANISATIONS_KEY,
} from '@/stores/useOrganisationStore'
import {
  ORGANISATION_MEMBERS_KEY,
  USER_PROFILE_KEY,
} from '@/stores/useUserStore'
import member1 from 'cypress/fixtures/userStorage/member-1'

const memberOrganisations = member1.get(ORGANISATIONS_KEY)
const memberRecentOrganisations = member1.get(RECENT_ORGANISATIONS_KEY)
const memberProfile = member1.get(USER_PROFILE_KEY)
const memberAllOrganisationsMembers = member1.get(ORGANISATION_MEMBERS_KEY)

const currentMemberId = memberProfile?.id ?? ''
const currentMemberName = memberProfile?.name ?? ''
const currentOrgId = memberRecentOrganisations
  ? memberRecentOrganisations[0] ?? ''
  : ''
const currentOrgName = memberOrganisations?.get(currentOrgId)?.name ?? ''
const currentDisplayName =
  memberAllOrganisationsMembers?.get(currentOrgId)?.get(currentMemberId)
    ?.name ?? ''
const nextOrgId = memberRecentOrganisations
  ? memberRecentOrganisations[1] ?? ''
  : ''
const nextOrgName = memberOrganisations?.get(nextOrgId)?.name ?? ''
const thirdOrgId = memberRecentOrganisations
  ? memberRecentOrganisations[2] ?? ''
  : ''

const differentDisplayName = 'Admin 1C'
const newProfileName = 'Admin 1X'
const newDisplayName = 'Admin 1Y'
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
    cy.getId('org-name').click()
    cy.getUUID(thirdOrgId).click()
    cy.getId('navigation-links').contains('Team').click()
    cy.getId('set-display-name').click()
    cy.getId('name-field').type(differentDisplayName)
    cy.getId('modal-confirm').click()
    cy.getId('members').should('contain.text', differentDisplayName)
  })

  it('create another org and a profile', () => {
    cy.window().then((window) =>
      window.localStorage.removeItem(USER_PROFILE_KEY),
    )
    cy.getId('org-name').should('be.visible').click()
    cy.getId('create-new-org').click()
    cy.url().should('contain', '/org/new')
    cy.handleOrgCreation(newOrgName)
    cy.getId('navigation-links').contains('Team').click()
    cy.getId('create-profile').click()
    cy.getId('user-name-field').type(newProfileName)
    cy.getId('display-name-field').type(newDisplayName)
    cy.getId('modal-confirm').click()
    cy.getId('members').should('contain.text', newDisplayName)
  })

  it('invite new member', () => {
    if (Cypress.isBrowser('chrome')) {
      cy.wrap(
        Cypress.automation('remote:debugger:protocol', {
          command: 'Browser.grantPermissions',
          params: {
            permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
            origin: window.location.origin,
          },
        }),
      )
    }
    cy.getId('org-name').should('contain.text', currentOrgName)
    cy.getId('navigation-links').contains('Team').click()
    cy.getId('invite-new-member').click()
    cy.getId('modal-confirm').realClick()
    cy.window()
      .its('navigator.clipboard')
      .invoke('readText')
      .then((link) => {
        return cy.visit(link)
      })
    cy.getId('org-name').contains(currentOrgName)
  })
})
