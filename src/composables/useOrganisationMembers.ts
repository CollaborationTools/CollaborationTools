import { createEvent } from '@/core/connector'
import { OrganisationId } from '@/core/organisation'
import {
  createOrganisationMember,
  createOrganisationMembersInContext,
  OrganisationMemberId,
  OrganisationMemberRole,
  OrganisationMembers,
} from '@/core/user'
import useUserStore from '@/stores/useUserStore'

type AddNewOrganisationMemberProps = {
  devices: string[] | undefined
  id: OrganisationMemberId | undefined
  name: string | undefined
  organisationId: OrganisationId | undefined
  role?: OrganisationMemberRole
}

type UseOrganisationMembers = {
  addNewOrganisationMember: (props: AddNewOrganisationMemberProps) => void
  createOrganisationMembersEvent: (
    senderId: OrganisationMemberId,
    organisationId: OrganisationId,
    organisationMembers: OrganisationMembers,
  ) => string
}

export default function useOrganisationMembers(): UseOrganisationMembers {
  const userStore = useUserStore()

  const addNewOrganisationMember = ({
    devices,
    id,
    name,
    organisationId,
    role,
  }: AddNewOrganisationMemberProps): void => {
    if (!devices || !id || !name || !organisationId) {
      return
    }
    const organisationMember = createOrganisationMember({
      id,
      devices,
      name,
      role,
    })
    userStore.setOrganisationMember(organisationId, organisationMember)
  }

  const createOrganisationMembersEvent = (
    senderId: OrganisationMemberId,
    organisationId: OrganisationId,
    organisationMembers: OrganisationMembers,
  ): string => {
    const organisationMembersInContext = createOrganisationMembersInContext(
      organisationId,
      organisationMembers,
    )
    const data = JSON.stringify(organisationMembersInContext)
    const event = createEvent({
      data,
      senderId,
      type: 'organisationMembers',
    })
    return JSON.stringify(event)
  }

  return { addNewOrganisationMember, createOrganisationMembersEvent }
}
