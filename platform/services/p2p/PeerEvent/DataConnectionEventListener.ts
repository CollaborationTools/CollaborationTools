import { DataConnection as PeerJsDataConnection } from 'peerjs'

import { DataConnectionEventType } from './DataConnectionEvent'

import { setConnection, createDataConnection } from '../PeerConnection'
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
    const connection = createDataConnection(dataConnection)

    peerConnector.eventHandler({
      type: DataConnectionEventType.PeerConnectionProposed,
      data: {
        connection,
      },
    })

    peerConnector.connections = setConnection(
      peerConnector.connections,
      connection,
    )
  }

  dataConnection.on('open', () => {
    const connection = createDataConnection(dataConnection)

    peerConnector.eventHandler({
      type: DataConnectionEventType.PeerConnected,
      data: {
        connection,
      },
    })

    peerConnector.connections = setConnection(
      peerConnector.connections,
      connection,
    )
  })

  dataConnection.on('close', () => {
    const connection = createDataConnection(dataConnection)

    peerConnector.eventHandler({
      type: DataConnectionEventType.PeerClosed,
      data: {
        connection,
      },
    })

    peerConnector.connections = setConnection(
      peerConnector.connections,
      connection,
    )
  })

  dataConnection.on('error', (error: PeerError) => {
    const connection = createDataConnection(dataConnection)

    peerConnector.eventHandler({
      type: DataConnectionEventType.PeerError,
      error: {
        connection,
        message: error.message,
        type: String(error?.type ?? 'unknown-error'),
      },
    })

    peerConnector.connections = setConnection(
      peerConnector.connections,
      connection,
    )
  })

  dataConnection.on('data', (data) => {
    const connection = createDataConnection(dataConnection)

    peerConnector.eventHandler({
      type: DataConnectionEventType.DataReceived,
      data: {
        connection,
        message: String(data),
      },
    })
  })
}
