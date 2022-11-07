import type { InviteId } from './Invite'
import type { OrganisationId } from 'core/organisation'
import type { MemberId } from 'core/user'

export type InviteLink = string // for encoded data

export type InviteLinkData = {
  expiryDate: string
  inviteId: InviteId
  inviterId: MemberId
  organisationId: OrganisationId
  organisationName: string
}

export type InviteLinkDataString = string // for decoded data

export const createInviteLinkData = ({
  expiryDate,
  inviteId,
  inviterId,
  organisationId,
  organisationName,
}: InviteLinkData): InviteLinkDataString => {
  return [
    inviterId,
    organisationName,
    inviteId,
    expiryDate,
    organisationId,
  ].toString()
}

export const parseInviteLinkData = (
  inviteLinkDataString: InviteLinkDataString,
): InviteLinkData | null => {
  const maybeInviteLinkData = inviteLinkDataString.split(',')

  if (maybeInviteLinkData.length !== 5) {
    return null
  }

  return {
    inviterId: String(maybeInviteLinkData.at(0)),
    organisationName: String(maybeInviteLinkData.at(1)),
    inviteId: String(maybeInviteLinkData.at(2)),
    expiryDate: String(maybeInviteLinkData.at(3)),
    organisationId: String(maybeInviteLinkData.at(4)),
  }
}
