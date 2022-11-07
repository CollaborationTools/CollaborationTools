import type { DeviceId, MemberId } from 'core/user'

export type InviteResponse = Readonly<{
  inviteId: string
  deviceId: DeviceId
  userId: MemberId
  userName: string
}>
