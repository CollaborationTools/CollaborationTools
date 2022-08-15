import {
  DeviceId,
  OrganisationMemberId,
  OrganisationMembers,
} from '@/core/user'
import { createPeer } from '@/services/p2p/peer'

export type EventManager = {
  connectDirectlyTo: (remoteDeviceId: DeviceId) => void
  getActiveConnections: () => string[]
  getDataFeed: () => string[]
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
  createReactiveArray,
}: CreateEventManagerParams): EventManager => {
  const activeConnections = createReactiveArray()
  const dataFeed = createReactiveArray()
  let organisationMembers = currentOrganisationMembers

  const peer = createPeer({
    myDeviceId: currentDeviceId,
    dataFeed,
    activeConnections,
  })

  const getActiveConnections = (): string[] => activeConnections
  const getDataFeed = (): string[] => dataFeed

  const connectDirectlyTo = (remoteDeviceId: DeviceId): void => {
    peer.connectTo(remoteDeviceId)
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
      peer.connectTo(device)
    })
  }

  connectToOrganisationMembers(currentOrganisationMembers)

  const setOrganisationMembers = (
    newOrganisationMembers: OrganisationMembers,
  ): void => {
    organisationMembers = newOrganisationMembers
    activeConnections.forEach((connection) => peer.disconnectFrom(connection))

    connectToOrganisationMembers(newOrganisationMembers)
  }

  const getConnectedDevicesIds = (
    devicesIds: Readonly<DeviceId[]>,
  ): Readonly<DeviceId[]> =>
    devicesIds.filter((device) => activeConnections.includes(device))

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
      recipientDevices.forEach((device) => peer.connectTo(device))
    }

    if (connectedDevicesIds.length > 0) {
      connectedDevicesIds.forEach((device) => peer.sendTo(device, data))
    }
  }

  const sendDirectlyTo = (remoteDeviceId: DeviceId, data: string): void => {
    peer.sendTo(remoteDeviceId, data)
  }

  return {
    connectDirectlyTo,
    getActiveConnections,
    getDataFeed,
    sendDataTo,
    sendDirectlyTo,
    setOrganisationMembers,
  }
}
