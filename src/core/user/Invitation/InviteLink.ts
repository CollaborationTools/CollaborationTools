import { getInviteLink } from '@/composables/useRouting'
import { OrganisationMemberId } from '@/core/user'
import { decode, encode } from '@/services/crypto/encoder'

export type InviteLinkData = {
  expiryDate: string
  invitationId: string
  inviterId: OrganisationMemberId
  organisationName: string
}

export const createInviteLink = ({
  expiryDate,
  invitationId,
  inviterId,
  organisationName,
}: InviteLinkData): string => {
  const inviteLinkData = [inviterId, organisationName, invitationId, expiryDate]
  const encodedData = encode(inviteLinkData.toString())
  return getInviteLink(encodedData)
}

export const parseInviteLinkData = (
  encodedInviteLinkData: string,
): InviteLinkData | null => {
  try {
    const inviteData = decode(encodedInviteLinkData)
    const maybeInviteLinkData = inviteData.split(',')

    if (maybeInviteLinkData.length !== 4) {
      return null
    }

    return {
      inviterId: String(maybeInviteLinkData.at(0)),
      organisationName: String(maybeInviteLinkData.at(1)),
      invitationId: String(maybeInviteLinkData.at(2)),
      expiryDate: String(maybeInviteLinkData.at(3)),
    }
  } catch (e) {
    return null
  }
}
