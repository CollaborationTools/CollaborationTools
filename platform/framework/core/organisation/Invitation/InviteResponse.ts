import { DeviceId, OrganisationMemberId } from '@/core/user'

export type CreateInviteResponseProps = {
  invitationId: string
  deviceId: DeviceId
  userId: OrganisationMemberId
  userName: string
}
export type InviteResponse = Readonly<CreateInviteResponseProps>

export const createInviteResponse = ({
  invitationId,
  deviceId,
  userName,
  userId,
}: CreateInviteResponseProps): InviteResponse => ({
  invitationId,
  deviceId,
  userName,
  userId,
})
