import { Ref } from 'vue'

import useOrganisationStore from '@/stores/useOrganisationStore'
import useUserStore from '@/stores/useUserStore'
import { Organisation, InviteResponse } from 'core/organisation'
import {
  DeviceId,
  OrganisationMemberId,
  OrganisationMembers,
  OrganisationMembersInContext,
} from 'core/user'
import {
  ConnectionHub,
  createConnectionHub,
  Event,
} from 'services/connectionHub'

type UseConnectionHub = {
  connectDirectlyTo: (remoteDeviceId: DeviceId) => void
  runConnectionHub: (
    currentDeviceId: DeviceId,
    currentOrganisationMembers?: OrganisationMembers,
  ) => void
  sendDataTo: (recipient: OrganisationMemberId, data: string) => void
  sendDirectlyTo: (remoteDeviceId: DeviceId, data: string) => void
  setOrganisationMembers: (organisationMembers: OrganisationMembers) => void
}

const connectionHub: Ref<ConnectionHub | null> = ref(null)

export default function useConnectionHub(): UseConnectionHub {
  const runConnectionHub = (
    currentDeviceId: DeviceId,
    currentOrganisationMembers: OrganisationMembers = [],
  ): void => {
    if (connectionHub.value) {
      return
    }

    const dataEventHandler = (dataEventString: string): void => {
      const event: Event = JSON.parse(dataEventString)
      if (event.type === 'invite') {
        const inviteResponse: InviteResponse = JSON.parse(event.data)
        useInvitations().closeInvite(inviteResponse)
      } else if (event.type === 'organisation') {
        const organisation: Organisation = JSON.parse(event.data)
        useOrganisationStore().setOrganisation(organisation)
      } else if (event.type === 'organisationMembers') {
        const {
          organisationId,
          organisationMembers,
        }: OrganisationMembersInContext = JSON.parse(event.data)
        organisationMembers.forEach((organisationMember) =>
          useUserStore().setOrganisationMember(
            organisationId,
            organisationMember,
          ),
        )
      }
    }

    connectionHub.value = createConnectionHub({
      currentDeviceId,
      currentOrganisationMembers,
      dataEventHandler,
    })
  }

  const connectDirectlyTo = (remoteDeviceId: DeviceId): void => {
    if (!connectionHub.value) {
      return
    }
    connectionHub.value.connectDirectlyTo(remoteDeviceId)
  }

  const sendDataTo = (recipient: OrganisationMemberId, data: string): void => {
    if (!connectionHub.value) {
      return
    }
    connectionHub.value.sendDataTo(recipient, data)
  }

  const sendDirectlyTo = (remoteDeviceId: DeviceId, data: string): void => {
    if (!connectionHub.value) {
      return
    }
    connectionHub.value.sendDirectlyTo(remoteDeviceId, data)
  }

  const setOrganisationMembers = (
    organisationMembers: OrganisationMembers,
  ): void => {
    if (!connectionHub.value) {
      return
    }
    connectionHub.value.setOrganisationMembers(organisationMembers)
  }

  return {
    connectDirectlyTo,
    runConnectionHub,
    sendDataTo,
    sendDirectlyTo,
    setOrganisationMembers,
  }
}
