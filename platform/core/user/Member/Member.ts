import { OrganisationId } from 'core/organisation'
import { DeviceId } from 'core/user'

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
  organisationId: OrganisationId
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
  organisationId: OrganisationId,
  members: Members,
): MembersInContext => {
  return { organisationId, members }
}
