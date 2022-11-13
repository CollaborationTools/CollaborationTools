/// <reference types="cypress-real-events" />
/* eslint-disable sonarjs/no-duplicate-string, promise/catch-or-return */

import { getSpaces } from 'core/space'
import member1 from 'cypress/fixtures/userStorage/member-1'
import { SPACES_KEY, CURRENT_SPACE_KEY } from 'stores/useSpaceStore'
import { MEMBERS_KEY, USER_PROFILE_KEY } from 'stores/useUserStore'

const memberSpaces = member1.get(SPACES_KEY)
const memberSpaceIds = memberSpaces
  ? getSpaces(memberSpaces).map((space) => space.id)
  : []
const memberCurrentSpaceId = member1.get(CURRENT_SPACE_KEY)
const memberProfile = member1.get(USER_PROFILE_KEY)
const memberAllSpacesMembers = member1.get(MEMBERS_KEY)

const currentMemberId = memberProfile?.id ?? ''
const currentMemberName = memberProfile?.name ?? ''
const currentSpaceId = memberCurrentSpaceId ?? ''
const currentSpaceName = memberSpaces?.get(currentSpaceId)?.name ?? ''
const currentDisplayName =
  memberAllSpacesMembers?.get(currentSpaceId)?.get(currentMemberId)?.name ?? ''
const nextSpaceId = memberSpaceIds?.[1] ?? ''
const nextSpaceName = memberSpaces?.get(nextSpaceId)?.name ?? ''
const thirdSpaceId = memberSpaceIds?.[2] ?? ''

const differentDisplayName = 'Admin 1C'
const newProfileName = 'Admin 1X'
const newDisplayName = 'Admin 1Y'
const newSpaceName = 'Space 4'

describe('a member can', () => {
  beforeEach(() => {
    cy.setUserStorage(member1)
    cy.visit('/')
  })

  it('browse and join existing spaces', () => {
    cy.url().should('contain', '/space/' + currentSpaceId)
    cy.getId('sidebar').contains('Team').click()
    cy.getId('members').should('contain.text', currentDisplayName)
    cy.getId('space-name').should('contain.text', currentSpaceName).click()
    cy.getUUID(nextSpaceId).click()
    cy.url().should('contain', '/space/' + nextSpaceId)
    cy.getId('space-name').should('contain.text', nextSpaceName)
    cy.getId('sidebar').contains('Team').click()
    cy.getId('join-now').click()
    cy.getId('members').should('contain.text', currentMemberName)
    cy.getId('space-name').click()
    cy.getUUID(thirdSpaceId).click()
    cy.getId('sidebar').contains('Team').click()
    cy.getId('set-display-name').click()
    cy.getId('name-field').type(differentDisplayName)
    cy.getId('modal-confirm').click()
    cy.getId('members').should('contain.text', differentDisplayName)
  })

  it('create another space and a profile', () => {
    cy.window().then((window) =>
      window.localStorage.removeItem(USER_PROFILE_KEY),
    )
    cy.getId('create-new-space').click()
    cy.url().should('contain', '/space/new')
    cy.handleSpaceCreation(newSpaceName)
    cy.getId('sidebar').contains('Team').click()
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
    cy.getId('space-name').should('contain.text', currentSpaceName)
    cy.getId('sidebar').contains('Team').click()
    cy.getId('invite-new-member').click()
    cy.getId('modal-confirm').realClick()
    cy.window()
      .its('navigator.clipboard')
      .invoke('readText')
      .then((link) => {
        return cy.visit(link)
      })
    cy.getId('space-name').contains(currentSpaceName)
  })
})
