import { DataConnection as PeerJsDataConnection } from 'peerjs'

import { DeviceId } from '@/core/user'

import { PeerConnector } from './PeerConnector'

import { PeerConnectionType, getConnectionId } from '../PeerConnection'
import { attachDataConnectionEventListeners } from '../PeerEvent'

const getDataConnection = (
  peerConnector: PeerConnector,
  remoteDeviceId: DeviceId,
): PeerJsDataConnection | null => {
  const connectionId = getConnectionId(
    peerConnector.currentDeviceId,
    remoteDeviceId,
  )

  const connection = peerConnector.connections.get(connectionId)

  if (!connection || connection.type === PeerConnectionType.Media) {
    return null
  } else {
    return connection.peerConnection
  }
}

export const connectTo = (
  peerConnector: PeerConnector,
  remoteDeviceId: DeviceId,
  attempt = 0,
): void => {
  if (peerConnector.peerJS.open) {
    const connectionId = getConnectionId(
      peerConnector.peerJS.id,
      remoteDeviceId,
    )
    const dataConnection = peerConnector.peerJS.connect(remoteDeviceId, {
      label: connectionId,
      reliable: true,
      serialization: 'json',
    })

    attachDataConnectionEventListeners(dataConnection, peerConnector, {
      isConnectingToPeer: true,
    })
  } else if (attempt < 10) {
    setTimeout(() => {
      connectTo(peerConnector, remoteDeviceId, ++attempt)
    }, 500)
  } else {
    console.error(
      `[PeerJS] Cannot connect to ${remoteDeviceId}, because signaling server was not connected yet.`,
    )
  }
}

export const disconnectFrom = (
  peerConnector: PeerConnector,
  remoteDeviceId: DeviceId,
): void => {
  const dataConnection = getDataConnection(peerConnector, remoteDeviceId)
  if (dataConnection) {
    dataConnection.close()
  }
}

export const sendTo = (
  peerConnector: PeerConnector,
  remoteDeviceId: DeviceId,
  data: string,
): void => {
  const dataConnection = getDataConnection(peerConnector, remoteDeviceId)
  if (dataConnection?.open) {
    dataConnection.send(data)
  }
}

export const exit = (peerConnector: PeerConnector): void => {
  peerConnector.peerJS.destroy()
}
