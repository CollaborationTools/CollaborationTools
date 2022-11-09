import type { MemberId } from '../Member'
import type { DeviceId } from 'core/user'

export type InviteResponse = Readonly<{
  inviteId: string
  deviceId: DeviceId
  userId: MemberId
  userName: string
}>
