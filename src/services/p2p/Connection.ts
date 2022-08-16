import { DataConnection as PeerDataConnection } from 'peerjs'

import { ConnectionManager } from '@/services/p2p/ConnectionManager'

export type DataConnection = PeerDataConnection

export const clearConnectionTo = (
  connectionManager: ConnectionManager,
  remoteDeviceId: string,
): void => {
  connectionManager.dataConnections = connectionManager.dataConnections.filter(
    (connection) => connection.peer !== remoteDeviceId,
  )
}

export const connectTo = (
  connectionManager: ConnectionManager,
  remoteDeviceId: string,
  attempt = 0,
): void => {
  if (connectionManager.state.status === 'active') {
    const newConnection = connectionManager.peer.connect(remoteDeviceId, {
      reliable: true,
      serialization: 'json',
    })

    newConnection.on('open', () => {
      connectionManager.dataConnections.push(newConnection)
    })

    newConnection.on('data', (data) => {
      connectionManager.dataFeed.push(String(data))
    })

    newConnection.on('close', () => {
      clearConnectionTo(connectionManager, remoteDeviceId)
    })

    newConnection.on('error', () => {
      if (!newConnection.open) {
        clearConnectionTo(connectionManager, remoteDeviceId)
      }
    })
  } else if (attempt < 10) {
    setTimeout(() => {
      connectTo(connectionManager, remoteDeviceId, ++attempt)
    }, 500)
  } else {
    console.error(
      `[PeerJS] Cannot connect to ${remoteDeviceId}, because signaling server was not connected yet.`,
    )
  }
}

export const disconnectFrom = (
  connectionManager: ConnectionManager,
  remoteDeviceId: string,
): void => {
  const dataConnection = connectionManager.dataConnections.find(
    (connection) => connection.peer === remoteDeviceId,
  )
  if (dataConnection) {
    dataConnection.close()
    clearConnectionTo(connectionManager, remoteDeviceId)
  }
}

export const sendTo = (
  connectionManager: ConnectionManager,
  remoteDeviceId: string,
  data: string,
): void => {
  const dataConnection = connectionManager.dataConnections.find(
    (connection) => connection.peer === remoteDeviceId,
  )
  if (dataConnection) {
    if (dataConnection.open) {
      dataConnection.send(data)
    } else {
      clearConnectionTo(connectionManager, dataConnection.peer)
    }
  }
}
