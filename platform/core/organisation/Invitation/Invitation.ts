import { OrganisationId } from 'core/organisation'
import { OrganisationMemberId } from 'core/user/OrganisationMember'

export type InvitationProps = {
  expiryDate: string
  id: string
  inviteLink: string
  inviterId: OrganisationMemberId
  organisationId: OrganisationId
  organisationName: string
}

export type Invitation = Readonly<
  InvitationProps & {
    inviteeId?: OrganisationMemberId
  }
>

export type Invitations = Readonly<Invitation[]>

export const INVITATION_EXPIRY_TIME_IN_MINUTES = 30
export const INVITATION_EXPIRY_TIME =
  INVITATION_EXPIRY_TIME_IN_MINUTES * 60 * 1000

export const createInviteExpiryDate = (): string => {
  return new Date(new Date().valueOf() + INVITATION_EXPIRY_TIME).toISOString()
}

export const createInvitation = ({
  expiryDate,
  id,
  inviteLink,
  inviterId,
  organisationId,
  organisationName,
}: InvitationProps): Invitation => {
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
