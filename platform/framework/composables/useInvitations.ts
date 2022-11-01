import useOrganisationStore from '@/stores/useOrganisationStore'
import useUserStore from '@/stores/useUserStore'
import {
  OrganisationId,
  createInvitation,
  Invitation,
  createInviteResponse,
  CreateInviteResponseProps,
  closeInvitation,
  InviteResponse,
} from 'core/organisation'
import { OrganisationMemberId } from 'core/user'
import { createEvent } from 'services/connectionHub'

type AcceptInviteProps = {
  inviterId: string
  invitationId: string
  userName: string
}

type UseInvitations = {
  acceptInvite: (acceptInviteProps: AcceptInviteProps) => void
  closeInvite: (invitationResponse: InviteResponse) => void
  connectToInviter: (inviterId?: string) => void
  createInvite: () => Invitation | null
}

export default function useInvitations(): UseInvitations {
  const userStore = useUserStore()
  const organisationStore = useOrganisationStore()

  const acceptInvite = ({
    inviterId,
    invitationId,
    userName,
  }: AcceptInviteProps): void => {
    const me = userStore.getMe()
    if (!me || !inviterId) {
      return
    }

    const inviteEvent = createInviteEvent({
      invitationId,
      deviceId: me.currentDevice,
      userId: me.id,
      userName,
    })

    useConnectionHub().sendDirectlyTo(inviterId, inviteEvent)
  }

  const closeInvite = (inviteResponse: InviteResponse): void => {
    const invitation = userStore.getInvitation(inviteResponse.invitationId)
    if (!invitation) {
      return
    }

    useOrganisationMembers().addNewOrganisationMember({
      devices: [inviteResponse.deviceId],
      id: inviteResponse.userId,
      name: inviteResponse.userName,
      organisationId: invitation.organisationId,
    })

    sendOrganisationDataTo(inviteResponse.deviceId, invitation.organisationId)

    const closedInvitation = closeInvitation(invitation, inviteResponse.userId)
    userStore.setInvitation(closedInvitation)
  }

  const connectToInviter = (inviterId?: string): void => {
    const currentDeviceId = userStore.getMe()?.currentDevice
    if (!currentDeviceId || !inviterId) {
      return
    }

    useConnectionHub().runConnectionHub(currentDeviceId)
    useConnectionHub().connectDirectlyTo(inviterId)
  }

  const createInvite = (): Invitation | null => {
    const inviterId = userStore.getMe()?.id
    const currentOrganisation = organisationStore.getCurrentOrganisation()

    if (!inviterId || !currentOrganisation) {
      return null
    }

    const organisationId = currentOrganisation.id
    const organisationName = currentOrganisation.name

    const invitation = createInvitation({
      inviterId,
      organisationId,
      organisationName,
    })
    userStore.setInvitation(invitation)
    return invitation
  }

  const createInviteEvent = (
    inviteResponseData: CreateInviteResponseProps,
  ): string => {
    const invitationResponse = createInviteResponse(inviteResponseData)
    const data = JSON.stringify(invitationResponse)
    const event = createEvent({
      data,
      senderId: invitationResponse.userId,
      type: 'invite',
    })
    return JSON.stringify(event)
  }

  const sendOrganisationDataTo = (
    inviteeId: OrganisationMemberId,
    organisationId: OrganisationId,
  ): void => {
    const me = userStore.getMe()
    const organisation = organisationStore.getOrganisation(organisationId)
    const organisationMembers = userStore.getOrganisationMembers(organisationId)

    if (!me || !organisation || !organisationMembers) {
      return
    }

    const organisationEvent = useOrganisations().createOrganisationEvent(
      me.id,
      organisation,
    )
    const organisationMembersEvent =
      useOrganisationMembers().createOrganisationMembersEvent(
        me.id,
        organisation.id,
        organisationMembers,
      )

    const { sendDirectlyTo } = useConnectionHub()
    sendDirectlyTo(inviteeId, organisationEvent)
    sendDirectlyTo(inviteeId, organisationMembersEvent)
  }

  return {
    acceptInvite,
    closeInvite,
    connectToInviter,
    createInvite,
  }
}
