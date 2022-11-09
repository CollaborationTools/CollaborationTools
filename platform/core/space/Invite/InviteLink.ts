import type { MemberId } from '../Member'
import type { SpaceId } from '../Space'
import type { InviteId } from './Invite'

export type InviteLink = string // for encoded data

export type InviteLinkData = {
  expiryDate: string
  inviteId: InviteId
  inviterId: MemberId
  spaceId: SpaceId
  spaceName: string
}

export type InviteLinkDataString = string // for decoded data

export const createInviteLinkData = ({
  expiryDate,
  inviteId,
  inviterId,
  spaceId,
  spaceName,
}: InviteLinkData): InviteLinkDataString => {
  return [inviterId, spaceName, inviteId, expiryDate, spaceId].toString()
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
    spaceName: String(maybeInviteLinkData.at(1)),
    inviteId: String(maybeInviteLinkData.at(2)),
    expiryDate: String(maybeInviteLinkData.at(3)),
    spaceId: String(maybeInviteLinkData.at(4)),
  }
}
