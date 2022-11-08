import { MemberId, Members } from 'core/organisation'
import { DeviceId } from 'core/user'
import {
  PeerEvent,
  connectTo,
  createPeerConnector,
  getConnectionId,
  sendTo,
  PeerEventType,
  PeerConnector,
} from 'services/p2p'

export type ConnectionHub = {
  connectDirectlyTo: (remoteDeviceId: DeviceId) => void
  sendDataTo: (recipient: MemberId, data: string) => void
  sendDirectlyTo: (remoteDeviceId: DeviceId, data: string) => void
  setMembers: (members: Members) => void
  getPeerConnector: () => PeerConnector
}

type CreateConnectionHubParams = {
  currentDeviceId: DeviceId
  currentMembers: Members
  dataEventHandler: (dataEvent: string) => void
}

export const createConnectionHub = ({
  currentDeviceId,
  currentMembers,
  dataEventHandler,
}: CreateConnectionHubParams): ConnectionHub => {
  let members = currentMembers

  const peerEventHandler = (peerEvent: PeerEvent): void => {
    if (peerEvent.type === PeerEventType.peer.data.DataReceived) {
      dataEventHandler(peerEvent.data.message)
    }
  }

  const peerConnector = createPeerConnector(currentDeviceId, peerEventHandler)

  const getPeerConnector = (): PeerConnector => peerConnector

  const connectDirectlyTo = (remoteDeviceId: DeviceId): void => {
    connectTo(peerConnector, remoteDeviceId)
  }

  const getOrgMembersDevices = (members: Members): Readonly<DeviceId[]> =>
    members.flatMap((member) => member.devices)

  const connectToMembers = (members: Members): void => {
    const orgDevices = getOrgMembersDevices(members).filter(
      (deviceId) => deviceId !== currentDeviceId,
    )

    orgDevices.forEach((device) => {
      connectTo(peerConnector, device)
    })
  }

  const setMembers = (newMembers: Members): void => {
    members = newMembers

    connectToMembers(newMembers)
  }

  const getConnectedDevicesIds = (
    devicesIds: Readonly<DeviceId[]>,
  ): Readonly<DeviceId[]> =>
    devicesIds.filter((device) => {
      const connectionId = getConnectionId(
        device,
        peerConnector.currentDeviceId,
      )
      return !!peerConnector.connections.get(connectionId)
    })

  const sendDataTo = (recipient: MemberId, data: string): void => {
    const member = members.find((orgMember) => orgMember.id === recipient)

    if (!member) {
      return
    }

    const recipientDevices = member.devices
    const connectedDevicesIds = getConnectedDevicesIds(recipientDevices)

    if (connectedDevicesIds.length === 0) {
      recipientDevices.forEach((device) => connectTo(peerConnector, device))
    }

    if (connectedDevicesIds.length > 0) {
      connectedDevicesIds.forEach((device) =>
        sendTo(peerConnector, device, data),
      )
    }
  }

  const sendDirectlyTo = (remoteDeviceId: DeviceId, data: string): void => {
    sendTo(peerConnector, remoteDeviceId, data)
  }

  return {
    connectDirectlyTo,
    getPeerConnector,
    sendDataTo,
    sendDirectlyTo,
    setMembers,
  }
}
