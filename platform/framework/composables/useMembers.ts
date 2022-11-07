import useUserStore from '@/stores/useUserStore'
import { OrganisationId } from 'core/organisation'
import {
  createMember,
  createMembersInContext,
  DeviceId,
  MemberId,
  MemberRole,
  Members,
} from 'core/user'
import { createEvent } from 'services/connectionHub'

type AddNewMemberProps = {
  devices: string[] | undefined
  id: MemberId | undefined
  name: string | undefined
  organisationId: OrganisationId | undefined
  role?: MemberRole
}

type UseMembers = {
  addNewMember: (props: AddNewMemberProps) => void
  createMembersEvent: (
    senderId: MemberId,
    organisationId: OrganisationId,
    members: Members,
  ) => string
  getOrgMemberNameByDeviceId: (deviceId: DeviceId) => string
}

export default function useMembers(): UseMembers {
  const userStore = useUserStore()

  const addNewMember = ({
    devices,
    id,
    name,
    organisationId,
    role,
  }: AddNewMemberProps): void => {
    if (!devices || !id || !name || !organisationId) {
      return
    }
    const member = createMember({
      id,
      devices,
      name,
      role,
    })
    userStore.setMember(organisationId, member)
  }

  const createMembersEvent = (
    senderId: MemberId,
    organisationId: OrganisationId,
    members: Members,
  ): string => {
    const membersInContext = createMembersInContext(organisationId, members)
    const data = JSON.stringify(membersInContext)
    const event = createEvent({
      data,
      senderId,
      type: 'members',
    })
    return JSON.stringify(event)
  }

  const getOrgMemberNameByDeviceId = (deviceId: DeviceId): string =>
    userStore.getMemberByDeviceId(deviceId)?.name ?? deviceId

  return {
    addNewMember,
    createMembersEvent,
    getOrgMemberNameByDeviceId,
  }
}
