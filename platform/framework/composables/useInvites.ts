import { INVITE_LINK_ENCODED_DATA, visitorRoutes } from '@/config'
import useSpaceStore from '@/stores/useSpaceStore'
import useUserStore from '@/stores/useUserStore'
import {
  closeInvite as coreCloseInvite,
  createInvite as coreCreateInvite,
  createInviteExpiryDate,
  createInviteLinkData,
  Invite,
  InviteLink,
  InviteResponse,
  MemberId,
  SpaceId,
} from 'core/space'
import { createEvent } from 'services/connectionHub'
import { encode } from 'services/crypto/encoder'
import { createUUID } from 'services/crypto/uuid'

type AcceptInviteProps = {
  inviterId: MemberId
  inviteId: MemberId
  userName: string
}

type UseInvites = {
  createInvite: () => Invite | null
  connectToInviter: (inviterId?: MemberId) => void
  acceptInvite: (acceptInviteProps: AcceptInviteProps) => void
  closeInvite: (inviteResponse: InviteResponse) => void
}

export default function useInvites(): UseInvites {
  const userStore = useUserStore()
  const spaceStore = useSpaceStore()

  const createInviteLink = (encodedData: string): InviteLink =>
    location.origin +
    visitorRoutes.invite.replace(INVITE_LINK_ENCODED_DATA, encodedData)

  const createInvite = (): Invite | null => {
    const inviterId = userStore.getMe()?.currentDevice
    const currentSpace = spaceStore.getCurrentSpace()

    if (!inviterId || !currentSpace) {
      return null
    }

    const spaceId = currentSpace.id
    const spaceName = currentSpace.name

    const inviteId = createUUID()
    const inviteExpiryDate = createInviteExpiryDate()

    const inviteString = createInviteLinkData({
      expiryDate: inviteExpiryDate,
      inviteId,
      inviterId,
      spaceId,
      spaceName,
    })

    const inviteLink = createInviteLink(encode(inviteString))

    const invite = coreCreateInvite({
      expiryDate: inviteExpiryDate,
      id: inviteId,
      inviteLink,
      inviterId,
      spaceId,
      spaceName,
    })

    userStore.setInvite(invite)
    return invite
  }

  const connectToInviter = (inviterId?: MemberId): void => {
    const currentDeviceId = userStore.getMe()?.currentDevice
    if (!currentDeviceId || !inviterId) {
      return
    }

    useConnectionHub().runConnectionHub(currentDeviceId)
    useConnectionHub().connectDirectlyTo(inviterId)
  }

  const createInviteEvent = (inviteResponse: InviteResponse): string => {
    const data = JSON.stringify(inviteResponse)
    const event = createEvent({
      data,
      senderId: inviteResponse.userId,
      type: 'invite',
    })
    return JSON.stringify(event)
  }

  const acceptInvite = ({
    inviterId,
    inviteId,
    userName,
  }: AcceptInviteProps): void => {
    const me = userStore.getMe()
    if (!me || !inviterId) {
      return
    }

    const inviteEvent = createInviteEvent({
      inviteId,
      deviceId: me.currentDevice,
      userId: me.id,
      userName,
    })

    useConnectionHub().sendDirectlyTo(inviterId, inviteEvent)
  }

  const sendSpaceDataTo = (inviteeId: MemberId, spaceId: SpaceId): void => {
    const me = userStore.getMe()
    const space = spaceStore.getSpace(spaceId)
    const members = userStore.getMembers(spaceId)

    if (!me || !space || !members) {
      return
    }

    const spaceEvent = useSpaces().createSpaceEvent(me.id, space)
    const membersEvent = useMembers().createMembersEvent(
      me.id,
      space.id,
      members,
    )

    const { sendDirectlyTo } = useConnectionHub()
    sendDirectlyTo(inviteeId, spaceEvent)
    sendDirectlyTo(inviteeId, membersEvent)
  }

  const closeInvite = (inviteResponse: InviteResponse): void => {
    const invite = userStore.getInvite(inviteResponse.inviteId)
    if (!invite) {
      return
    }

    useMembers().addNewMember({
      devices: [inviteResponse.deviceId],
      id: inviteResponse.userId,
      name: inviteResponse.userName,
      spaceId: invite.spaceId,
    })

    sendSpaceDataTo(inviteResponse.deviceId, invite.spaceId)

    const closedInvite = coreCloseInvite(invite, inviteResponse.userId)
    userStore.setInvite(closedInvite)
  }

  return {
    createInvite,
    connectToInviter,
    acceptInvite,
    closeInvite,
  }
}
