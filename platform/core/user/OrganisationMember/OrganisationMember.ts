import { OrganisationId } from 'core/organisation'
import { DeviceId } from 'core/user'

export type OrganisationMemberId = string
export type OrganisationMemberRole = 'admin' | 'member'
export type OrganisationMemberStatus = 'active' | 'inactive' | 'removed'

type CreateOrganisationMemberParams = {
  devices: Readonly<DeviceId[]>
  id: OrganisationMemberId
  name: string
  role?: OrganisationMemberRole
  status?: OrganisationMemberStatus
}

export type OrganisationMember = Readonly<{
  devices: Readonly<DeviceId[]>
  id: OrganisationMemberId
  joiningDate: string
  name: string
  publicKey: string
  role: OrganisationMemberRole
  status: OrganisationMemberStatus
}>

export type OrganisationMembers = Readonly<OrganisationMember[]>
export type OrganisationMembersInContext = Readonly<{
  organisationId: OrganisationId
  organisationMembers: OrganisationMembers
}>

export const createOrganisationMember = ({
  id,
  devices,
  name,
  role = 'member',
  status = 'active',
}: CreateOrganisationMemberParams): OrganisationMember => {
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

export const createOrganisationMembersInContext = (
  organisationId: OrganisationId,
  organisationMembers: OrganisationMembers,
): OrganisationMembersInContext => {
  return { organisationId, organisationMembers }
}
