import { getInviteLink } from '@/composables/useRouting'
import { decode, encode } from '@/services/crypto/encoder'
import { OrganisationId } from 'core/organisation'
import { OrganisationMemberId } from 'core/user'


export type InviteLinkData = {
  expiryDate: string
  invitationId: string
  inviterId: OrganisationMemberId
  organisationId: OrganisationId
  organisationName: string
}

export const createInviteLink = ({
  expiryDate,
  invitationId,
  inviterId,
  organisationId,
  organisationName,
}: InviteLinkData): string => {
  const inviteLinkData = [
    inviterId,
    organisationName,
    invitationId,
    expiryDate,
    organisationId,
  ]
  const encodedData = encode(inviteLinkData.toString())
  return getInviteLink(encodedData)
}

export const parseInviteLinkData = (
  encodedInviteLinkData: string,
): InviteLinkData | null => {
  try {
    const inviteData = decode(encodedInviteLinkData)
    const maybeInviteLinkData = inviteData.split(',')

    if (maybeInviteLinkData.length !== 5) {
      return null
    }

    return {
      inviterId: String(maybeInviteLinkData.at(0)),
      organisationName: String(maybeInviteLinkData.at(1)),
      invitationId: String(maybeInviteLinkData.at(2)),
      expiryDate: String(maybeInviteLinkData.at(3)),
      organisationId: String(maybeInviteLinkData.at(4)),
    }
  } catch (e) {
    return null
  }
}
