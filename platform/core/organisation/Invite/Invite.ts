import type { InviteLink } from './InviteLink'
import type { OrganisationId } from 'core/organisation'
import type { MemberId } from 'core/user/Member'

export type InviteId = string

export type Invite = Readonly<{
  expiryDate: string
  id: InviteId
  inviteeId?: MemberId
  inviteLink: InviteLink
  inviterId: MemberId
  organisationId: OrganisationId
  organisationName: string
}>

export type Invites = Readonly<Invite[]>

export type CreateInviteProps = Omit<Invite, 'inviteeId'>

export const INVITE_EXPIRY_TIME_IN_MINUTES = 30
export const INVITE_EXPIRY_TIME = INVITE_EXPIRY_TIME_IN_MINUTES * 60 * 1000

export const createInviteExpiryDate = (): string => {
  return new Date(new Date().valueOf() + INVITE_EXPIRY_TIME).toISOString()
}

export const createInvite = ({
  expiryDate,
  id,
  inviteLink,
  inviterId,
  organisationId,
  organisationName,
}: CreateInviteProps): Invite => {
  return {
    expiryDate,
    id,
    inviteLink,
    inviterId,
    organisationId,
    organisationName,
  }
}

export const closeInvite = (invite: Invite, inviteeId: MemberId): Invite => ({
  ...invite,
  inviteeId,
})
