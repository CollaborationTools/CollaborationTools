
import { OrganisationId, createInviteLink } from 'core/organisation'
import { OrganisationMemberId } from 'core/user/OrganisationMember'
import { createUUID } from 'services/browser/uuid'

export type InvitationProps = {
  inviterId: OrganisationMemberId
  organisationId: OrganisationId
  organisationName: string
}

export type Invitation = Readonly<
  InvitationProps & {
    expiryDate: string
    id: string
    inviteLink: string
    inviteeId?: OrganisationMemberId
  }
>

export type Invitations = Readonly<Invitation[]>

export const INVITATION_EXPIRY_TIME_IN_MINUTES = 30
export const INVITATION_EXPIRY_TIME =
  INVITATION_EXPIRY_TIME_IN_MINUTES * 60 * 1000

export const createInvitation = ({
  inviterId,
  organisationId,
  organisationName,
}: InvitationProps): Invitation => {
  const expiryDate = new Date(
    new Date().valueOf() + INVITATION_EXPIRY_TIME,
  ).toISOString()

  const id = createUUID()

  const inviteLink = createInviteLink({
    expiryDate,
    invitationId: id,
    inviterId,
    organisationId,
    organisationName,
  })

  return {
    expiryDate,
    id,
    inviteLink,
    inviterId,
    organisationId,
    organisationName,
  }
}

export const closeInvitation = (
  invitation: Invitation,
  inviteeId: OrganisationMemberId,
): Invitation => ({ ...invitation, inviteeId })
