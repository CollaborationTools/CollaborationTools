import { MEMBER_ID_PARAM, SPACE_ID_PARAM, spaceRoutes } from '@/config'
import useUserStore from '@/stores/useUserStore'
import {
  createMember,
  createMembersInContext,
  MemberId,
  MemberRole,
  Members,
  SpaceId,
} from 'core/space'
import { DeviceId } from 'core/user'
import { createEvent } from 'services/connectionHub'

type AddNewMemberProps = {
  devices: string[] | undefined
  id: MemberId | undefined
  name: string | undefined
  spaceId: SpaceId | undefined
  role?: MemberRole
}

type UseMembers = {
  addNewMember: (props: AddNewMemberProps) => void
  createMembersEvent: (
    senderId: MemberId,
    spaceId: SpaceId,
    members: Members,
  ) => string
  getMemberNameByDeviceId: (deviceId: DeviceId) => string
  getMemberPath: (spaceId: SpaceId, memberId: MemberId) => string
}

export default function useMembers(): UseMembers {
  const userStore = useUserStore()

  const addNewMember = ({
    devices,
    id,
    name,
    spaceId,
    role,
  }: AddNewMemberProps): void => {
    if (!devices || !id || !name || !spaceId) {
      return
    }
    const member = createMember({
      id,
      devices,
      name,
      role,
    })
    userStore.setMember(spaceId, member)
  }

  const createMembersEvent = (
    senderId: MemberId,
    spaceId: SpaceId,
    members: Members,
  ): string => {
    const membersInContext = createMembersInContext(spaceId, members)
    const data = JSON.stringify(membersInContext)
    const event = createEvent({
      data,
      senderId,
      type: 'members',
    })
    return JSON.stringify(event)
  }

  const getMemberNameByDeviceId = (deviceId: DeviceId): string =>
    userStore.getMemberByDeviceId(deviceId)?.name ?? deviceId

  const getMemberPath = (spaceId: SpaceId, memberId: MemberId): string =>
    spaceRoutes.member
      .replace(SPACE_ID_PARAM, spaceId)
      .replace(MEMBER_ID_PARAM, memberId)

  return {
    addNewMember,
    createMembersEvent,
    getMemberNameByDeviceId,
    getMemberPath,
  }
}
