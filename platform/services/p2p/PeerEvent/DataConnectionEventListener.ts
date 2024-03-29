import { DataConnection as PeerJsDataConnection } from 'peerjs'

import { DataConnectionEventType } from './DataConnectionEvent'

import { createDataConnection, PeerConnectionStatus } from '../PeerConnection'
import { PeerConnector, PeerError } from '../PeerConnector'

type AttachDataConnectionEventListenersOptions = { isConnectingToPeer: boolean }

export const attachDataConnectionEventListeners = (
  dataConnection: PeerJsDataConnection,
  peerConnector: PeerConnector,
  options: AttachDataConnectionEventListenersOptions = {
    isConnectingToPeer: false,
  },
): void => {
  if (options.isConnectingToPeer) {
    const connection = createDataConnection(
      dataConnection,
      PeerConnectionStatus.Connecting,
    )

    peerConnector.eventHandler({
      type: DataConnectionEventType.PeerConnectionProposed,
      data: {
        connection,
      },
    })

    peerConnector.connections.set(connection.id, connection)
  }

  dataConnection.on('open', () => {
    const isConnectionAlreadyOpen = (): boolean =>
      peerConnector.connections.get(dataConnection.label)?.status ===
      PeerConnectionStatus.Open

    if (isConnectionAlreadyOpen()) {
      return
    }

    const connection = createDataConnection(
      dataConnection,
      PeerConnectionStatus.Open,
    )

    peerConnector.eventHandler({
      type: DataConnectionEventType.PeerConnected,
      data: {
        connection,
      },
    })

    peerConnector.connections.set(connection.id, connection)
  })

  dataConnection.on('close', () => {
    const connection = createDataConnection(
      dataConnection,
      PeerConnectionStatus.Closed,
    )

    peerConnector.eventHandler({
      type: DataConnectionEventType.PeerClosed,
      data: {
        connection,
      },
    })

    peerConnector.connections.set(connection.id, connection)
  })

  dataConnection.on('error', (error: PeerError) => {
    const status = dataConnection.open
      ? PeerConnectionStatus.Open
      : PeerConnectionStatus.Closed
    const connection = createDataConnection(dataConnection, status)

    peerConnector.eventHandler({
      type: DataConnectionEventType.PeerError,
      error: {
        connection,
        message: error.message,
        type: String(error?.type ?? 'unknown-error'),
      },
    })

    peerConnector.connections.set(connection.id, connection)
  })

  dataConnection.on('data', (data) => {
    const connection = createDataConnection(
      dataConnection,
      PeerConnectionStatus.Open,
    )

    peerConnector.eventHandler({
      type: DataConnectionEventType.DataReceived,
      data: {
        connection,
        message: String(data),
      },
    })
  })
}
