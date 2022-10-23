import {
  DeviceId,
  OrganisationMemberId,
  OrganisationMembers,
} from '@/core/user'
import {
  PeerEvent,
  connectTo,
  createPeerConnector,
  getConnectionId,
  sendTo,
} from '@/services/p2p'

export type EventManager = {
  connectDirectlyTo: (remoteDeviceId: DeviceId) => void
  sendDataTo: (recipient: OrganisationMemberId, data: string) => void
  sendDirectlyTo: (remoteDeviceId: DeviceId, data: string) => void
  setOrganisationMembers: (organisationMembers: OrganisationMembers) => void
}

type CreateEventManagerParams = {
  currentDeviceId: DeviceId
  currentOrganisationMembers: OrganisationMembers
  createReactiveArray: () => string[]
}

export const createEventManager = ({
  currentDeviceId,
  currentOrganisationMembers,
}: CreateEventManagerParams): EventManager => {
  let organisationMembers = currentOrganisationMembers

  const eventHandler = (connectionEvent: PeerEvent): void => {
    console.log(connectionEvent)
  }

  const connectionManager = createPeerConnector(currentDeviceId, eventHandler)
  console.log(connectionManager)

  const connectDirectlyTo = (remoteDeviceId: DeviceId): void => {
    connectTo(connectionManager, remoteDeviceId)
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
      connectTo(connectionManager, device)
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
        connectionManager.currentDeviceId,
      )
      return !!connectionManager.connections.get(connectionId)
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
      recipientDevices.forEach((device) => connectTo(connectionManager, device))
    }

    if (connectedDevicesIds.length > 0) {
      connectedDevicesIds.forEach((device) =>
        sendTo(connectionManager, device, data),
      )
    }
  }

  const sendDirectlyTo = (remoteDeviceId: DeviceId, data: string): void => {
    sendTo(connectionManager, remoteDeviceId, data)
  }

  return {
    connectDirectlyTo,
    sendDataTo,
    sendDirectlyTo,
    setOrganisationMembers,
  }
}
