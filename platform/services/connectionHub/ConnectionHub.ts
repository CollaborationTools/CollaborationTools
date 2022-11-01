import { DeviceId, OrganisationMemberId, OrganisationMembers } from 'core/user'
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
  sendDataTo: (recipient: OrganisationMemberId, data: string) => void
  sendDirectlyTo: (remoteDeviceId: DeviceId, data: string) => void
  setOrganisationMembers: (organisationMembers: OrganisationMembers) => void
  getPeerConnector: () => PeerConnector
}

type CreateConnectionHubParams = {
  currentDeviceId: DeviceId
  currentOrganisationMembers: OrganisationMembers
  dataEventHandler: (dataEvent: string) => void
}

export const createConnectionHub = ({
  currentDeviceId,
  currentOrganisationMembers,
  dataEventHandler,
}: CreateConnectionHubParams): ConnectionHub => {
  let organisationMembers = currentOrganisationMembers

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

  const getOrgMembersDevices = (
    organisationMembers: OrganisationMembers,
  ): Readonly<DeviceId[]> =>
    organisationMembers.flatMap(
      (organisationMember) => organisationMember.devices,
    )

  const connectToOrganisationMembers = (
    organisationMembers: OrganisationMembers,
  ): void => {
    const orgDevices = getOrgMembersDevices(organisationMembers).filter(
      (deviceId) => deviceId !== currentDeviceId,
    )

    orgDevices.forEach((device) => {
      connectTo(peerConnector, device)
    })
  }

  connectToOrganisationMembers(currentOrganisationMembers)

  const setOrganisationMembers = (
    newOrganisationMembers: OrganisationMembers,
  ): void => {
    organisationMembers = newOrganisationMembers

    connectToOrganisationMembers(newOrganisationMembers)
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

  const sendDataTo = (recipient: OrganisationMemberId, data: string): void => {
    const organisationMember = organisationMembers.find(
      (orgMember) => orgMember.id === recipient,
    )

    if (!organisationMember) {
      return
    }

    const recipientDevices = organisationMember.devices
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
    setOrganisationMembers,
  }
}
