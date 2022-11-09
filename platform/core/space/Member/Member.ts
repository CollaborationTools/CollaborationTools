import { DeviceId } from 'core/user'

import { SpaceId } from '../Space'

export type MemberId = string
export type MemberRole = 'admin' | 'member'
export type MemberStatus = 'active' | 'inactive' | 'removed'

export type Member = Readonly<{
  devices: Readonly<DeviceId[]>
  id: MemberId
  joiningDate: string
  name: string
  publicKey: string
  role: MemberRole
  status: MemberStatus
}>
export type Members = Readonly<Member[]>
export type MembersInContext = Readonly<{
  spaceId: SpaceId
  members: Members
}>

type CreateMemberParams = Pick<Member, 'devices' | 'id' | 'name'> &
  Partial<Pick<Member, 'role' | 'status'>>

export const createMember = ({
  devices,
  id,
  name,
  role = 'member',
  status = 'active',
}: CreateMemberParams): Member => {
  return {
    devices,
    id,
    joiningDate: new Date().toISOString(),
    name,
    publicKey: '',
    role,
    status,
  }
}

export const createMembersInContext = (
  spaceId: SpaceId,
  members: Members,
): MembersInContext => {
  return { spaceId, members }
}
