import { Ref } from 'vue'

import useSpaceStore from '@/stores/useSpaceStore'
import useUserStore from '@/stores/useUserStore'
import {
  InviteResponse,
  MemberId,
  Members,
  MembersInContext,
  Space,
} from 'core/space'
import { DeviceId } from 'core/user'
import {
  ConnectionHub,
  createConnectionHub,
  Event,
} from 'services/connectionHub'
import { PeerConnectionsMap } from 'services/p2p'


type UseConnectionHub = {
  connectDirectlyTo: (remoteDeviceId: DeviceId) => void
  getConnections: () => PeerConnectionsMap | null
  runConnectionHub: (
    currentDeviceId: DeviceId,
    currentMembers?: Members,
  ) => void
  sendDataTo: (recipient: MemberId, data: string) => void
  sendDirectlyTo: (remoteDeviceId: DeviceId, data: string) => void
  setMembers: (members: Members) => void
}

const connectionHub: Ref<ConnectionHub | null> = ref(null)

export default function useConnectionHub(): UseConnectionHub {
  const runConnectionHub = (
    currentDeviceId: DeviceId,
    currentMembers: Members = [],
  ): void => {
    if (connectionHub.value) {
      return
    }

    const dataEventHandler = (dataEventString: string): void => {
      const event: Event = JSON.parse(dataEventString)
      if (event.type === 'invite') {
        const inviteResponse: InviteResponse = JSON.parse(event.data)
        useInvites().closeInvite(inviteResponse)
      } else if (event.type === 'space') {
        const space: Space = JSON.parse(event.data)
        useSpaceStore().setSpace(space)
      } else if (event.type === 'members') {
        const { spaceId, members }: MembersInContext = JSON.parse(event.data)
        members.forEach((member) => useUserStore().setMember(spaceId, member))
      }
    }

    connectionHub.value = createConnectionHub({
      currentDeviceId,
      currentMembers,
      dataEventHandler,
    })

    if (connectionHub.value === null) {
      return
    }

    const peerConnector = connectionHub.value.getPeerConnector()
    peerConnector.connections = reactive(peerConnector.connections)
  }

  const connectDirectlyTo = (remoteDeviceId: DeviceId): void => {
    if (!connectionHub.value) {
      return
    }
    connectionHub.value.connectDirectlyTo(remoteDeviceId)
  }

  const getConnections = (): PeerConnectionsMap | null => {
    if (!connectionHub.value || !useUserStore().getIsDebug()) {
      return null
    }

    return connectionHub.value.getPeerConnector().connections
  }

  const sendDataTo = (recipient: MemberId, data: string): void => {
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

  const setMembers = (members: Members): void => {
    if (!connectionHub.value) {
      return
    }
    connectionHub.value.setMembers(members)
  }

  return {
    connectDirectlyTo,
    getConnections,
    runConnectionHub,
    sendDataTo,
    sendDirectlyTo,
    setMembers,
  }
}
