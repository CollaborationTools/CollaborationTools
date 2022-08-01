import { Ref } from 'vue'

import { Connector, createConnector, Event } from '@/core/connector'
import { Organisation } from '@/core/organisation'
import {
  DeviceId,
  InviteResponse,
  OrganisationMemberId,
  OrganisationMembers,
  OrganisationMembersInContext,
} from '@/core/user'
import useOrganisationStore from '@/stores/useOrganisationStore'
import useUserStore from '@/stores/useUserStore'

type UseConnections = {
  connectDirectlyTo: (remoteDeviceId: DeviceId) => void
  runConnector: (
    currentDeviceId: DeviceId,
    currentOrganisationMembers?: OrganisationMembers,
  ) => void
  sendDataTo: (recipient: OrganisationMemberId, data: string) => void
  sendDirectlyTo: (remoteDeviceId: DeviceId, data: string) => void
}

const connector: Ref<Connector | null> = ref(null)

export default function useConnections(): UseConnections {
  const runConnector = (
    currentDeviceId: DeviceId,
    currentOrganisationMembers: OrganisationMembers = [],
  ): void => {
    if (connector.value) {
      return
    }

    const createReactiveArray = (): string[] => reactive([])

    connector.value = createConnector({
      currentDeviceId,
      currentOrganisationMembers,
      createReactiveArray,
    })

    if (!connector.value) {
      return
    }

    const dataFeed = connector.value.getDataFeed()

    watch(
      dataFeed,
      () => {
        if (dataFeed.length > 0) {
          const event: Event = JSON.parse(String(dataFeed.shift()))
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
      },
      { deep: true, immediate: true },
    )
  }

  const connectDirectlyTo = (remoteDeviceId: DeviceId): void => {
    if (!connector.value) {
      return
    }
    connector.value.connectDirectlyTo(remoteDeviceId)
  }

  const sendDataTo = (recipient: OrganisationMemberId, data: string): void => {
    if (!connector.value) {
      return
    }
    connector.value.sendDataTo(recipient, data)
  }

  const sendDirectlyTo = (remoteDeviceId: DeviceId, data: string): void => {
    if (!connector.value) {
      return
    }
    connector.value.sendDirectlyTo(remoteDeviceId, data)
  }

  return {
    connectDirectlyTo,
    runConnector,
    sendDataTo,
    sendDirectlyTo,
  }
}
