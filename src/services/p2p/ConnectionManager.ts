import { DataConnection, PeerErrorType, Peer as PeerJs } from 'peerjs'

import { clearConnectionTo } from '@/services/p2p/Connection'

type PeerError = Error & {
  type?: PeerErrorType
}

export type ConnectionManagerStatus =
  | 'connecting'
  | 'active'
  | 'closed'
  | 'erroneous'

export type ConnectionManagerState = {
  currentDeviceId: string
  status: ConnectionManagerStatus
  error: string | null
}

export type ConnectionManager = {
  state: ConnectionManagerState
  peer: PeerJs
  dataConnections: DataConnection[]
  dataFeed: string[]
}

export const createConnectionManager = (
  currentDeviceId: string,
): ConnectionManager => {
  const peer = new PeerJs(currentDeviceId, { debug: 2 })

  const connectionManager: ConnectionManager = {
    state: {
      currentDeviceId,
      status: 'connecting',
      error: null,
    },
    peer,
    dataConnections: [],
    dataFeed: [],
  }

  peer.on('open', () => {
    connectionManager.state.status = 'active'
  })

  peer.on('disconnected', () => {
    connectionManager.state.status = 'closed'
    if (!peer.destroyed) {
      peer.reconnect()
      connectionManager.state.status = 'connecting'
    }
  })

  peer.on('close', () => {
    connectionManager.state.status = 'closed'
  })

  peer.on('error', (error: PeerError) => {
    connectionManager.state.error = error?.type ?? 'unknown-error'
    if (!peer.open) {
      connectionManager.state.status = 'erroneous'
    }
  })

  peer.on('connection', (dataConnection) => {
    connectionManager.dataConnections.push(dataConnection)

    dataConnection.on('data', (data) => {
      connectionManager.dataFeed.push(String(data))
    })

    dataConnection.on('close', () => {
      clearConnectionTo(connectionManager, dataConnection.peer)
    })

    dataConnection.on('error', () => {
      if (!dataConnection.open) {
        clearConnectionTo(connectionManager, dataConnection.peer)
      }
    })
  })

  return connectionManager
}

export const exit = (connectionManager: ConnectionManager): void => {
  connectionManager.state.status = 'closed'
  connectionManager.dataConnections.length = 0
  connectionManager.peer.destroy()
}
