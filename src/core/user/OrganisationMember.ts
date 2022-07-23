import { User } from '@/core/user/User'

export type OrganisationMemberId = string
export type OrganisationMemberRole = 'admin' | 'member'
export type OrganisationMemberStatus = 'active' | 'inactive' | 'removed'

export type OrganisationMember = Readonly<{
  devices: Readonly<string[]>
  id: OrganisationMemberId
  joiningDate: string
  name: string
  publicKey: string
  role: OrganisationMemberRole
  status: OrganisationMemberStatus
}>

export type OrganisationMembers = Readonly<OrganisationMember[]>

export const createOrganisationMember = (
  user: User,
  role: OrganisationMemberRole = 'member',
  displayName?: string,
  status?: OrganisationMemberStatus,
): OrganisationMember => {
  return {
    devices: user.devices,
    id: user.id,
    joiningDate: new Date().toISOString(),
    name: displayName ?? user.name,
    publicKey: '',
    role,
    status: status ?? 'active',
  }
}
