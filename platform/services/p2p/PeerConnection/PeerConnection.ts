import {
  DataConnection as PeerJsDataConnection,
  MediaConnection as PeerjsMediaConnection,
} from 'peerjs'

import { DeviceId } from 'core/user'

import { PeerConnectionType } from './PeerConnectionType'

export type PeerConnectionId = string
export enum PeerConnectionStatus {
  'Connecting' = 'Connecting',
  'Open' = 'Open',
  'Closed' = 'Closed',
}

type BasicPeerConnection = {
  id: PeerConnectionId
  isOpen: () => boolean
  remoteDeviceId: DeviceId
  status: PeerConnectionStatus
}

export type DataConnection = BasicPeerConnection & {
  peerConnection: PeerJsDataConnection
  type: PeerConnectionType.Data
}

export type MediaConnection = BasicPeerConnection & {
  peerConnection: PeerjsMediaConnection
  type: PeerConnectionType.Media
}

export type PeerConnection = DataConnection | MediaConnection

export const getConnectionId = (
  deviceId1: DeviceId,
  deviceId2: DeviceId,
  type: PeerConnectionType = PeerConnectionType.Data,
): PeerConnectionId =>
  deviceId1 > deviceId2
    ? `${type}|${deviceId2}|${deviceId1}`
    : `${type}|${deviceId1}|${deviceId2}`

export const createDataConnection = (
  connection: PeerJsDataConnection,
  status: PeerConnectionStatus,
): DataConnection => {
  const type = PeerConnectionType.Data

  const remoteDeviceId = connection.peer
  const id =
    connection.label ??
    getConnectionId(remoteDeviceId, connection.provider.id, type)
  const isOpen = (): boolean => connection.open

  return {
    peerConnection: connection,
    id,
    isOpen,
    remoteDeviceId,
    status,
    type,
  }
}
export const createMediaConnection = (
  connection: PeerjsMediaConnection,
  status: PeerConnectionStatus,
): MediaConnection => {
  const type = PeerConnectionType.Media

  const remoteDeviceId = connection.peer
  const id = getConnectionId(remoteDeviceId, connection.provider.id, type)
  const isOpen = (): boolean => connection.open

  return {
    peerConnection: connection,
    id,
    isOpen,
    remoteDeviceId,
    status,
    type,
  }
}
