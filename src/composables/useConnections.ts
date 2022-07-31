import { Ref } from 'vue'

import { Connector, createConnector, Event } from '@/core/connector'
import {
  DeviceId,
  InviteResponse,
  OrganisationMemberId,
  OrganisationMembers,
} from '@/core/user'

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
