import type { DeviceId, OrganisationMemberId } from 'core/user'

export type InviteResponse = Readonly<{
  inviteId: string
  deviceId: DeviceId
  userId: OrganisationMemberId
  userName: string
}>
