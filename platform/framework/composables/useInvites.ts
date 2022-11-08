import useOrganisationStore from '@/stores/useOrganisationStore'
import useUserStore from '@/stores/useUserStore'
import { createInviteLink } from 'composables/useRouting'
import {
  OrganisationId,
  createInvite as coreCreateInvite,
  Invite,
  closeInvite as coreCloseInvite,
  InviteResponse,
  createInviteLinkData,
  createInviteExpiryDate,
  MemberId,
} from 'core/organisation'
import { createUUID } from 'services/browser/uuid'
import { createEvent } from 'services/connectionHub'
import { encode } from 'services/crypto/encoder'

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
  const organisationStore = useOrganisationStore()

  const createInvite = (): Invite | null => {
    const inviterId = userStore.getMe()?.currentDevice
    const currentOrganisation = organisationStore.getCurrentOrganisation()

    if (!inviterId || !currentOrganisation) {
      return null
    }

    const organisationId = currentOrganisation.id
    const organisationName = currentOrganisation.name

    const inviteId = createUUID()
    const inviteExpiryDate = createInviteExpiryDate()

    const inviteString = createInviteLinkData({
      expiryDate: inviteExpiryDate,
      inviteId,
      inviterId,
      organisationId,
      organisationName,
    })

    const inviteLink = createInviteLink(encode(inviteString))

    const invite = coreCreateInvite({
      expiryDate: inviteExpiryDate,
      id: inviteId,
      inviteLink,
      inviterId,
      organisationId,
      organisationName,
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

  const sendOrganisationDataTo = (
    inviteeId: MemberId,
    organisationId: OrganisationId,
  ): void => {
    const me = userStore.getMe()
    const organisation = organisationStore.getOrganisation(organisationId)
    const members = userStore.getMembers(organisationId)

    if (!me || !organisation || !members) {
      return
    }

    const organisationEvent = useOrganisations().createOrganisationEvent(
      me.id,
      organisation,
    )
    const membersEvent = useMembers().createMembersEvent(
      me.id,
      organisation.id,
      members,
    )

    const { sendDirectlyTo } = useConnectionHub()
    sendDirectlyTo(inviteeId, organisationEvent)
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
      organisationId: invite.organisationId,
    })

    sendOrganisationDataTo(inviteResponse.deviceId, invite.organisationId)

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
