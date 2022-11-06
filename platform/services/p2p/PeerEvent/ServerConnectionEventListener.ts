import { DataConnectionEventType } from './DataConnectionEvent'
import { attachDataConnectionEventListeners } from './DataConnectionEventListener'
import { MediaConnectionEventType } from './MediaConnectionEvent'
import { attachMediaConnectionEventListeners } from './MediaConnectionEventListener'
import { ServerEventType } from './ServerConnectionEvent'

import {
  createDataConnection,
  createMediaConnection,
  PeerConnectionStatus,
} from '../PeerConnection'
import { PeerConnector, PeerError } from '../PeerConnector'

export const attachServerEventListeners = (
  peerConnector: PeerConnector,
): void => {
  peerConnector.peerJS.on('open', () => {
    peerConnector.eventHandler({
      type: ServerEventType.ServerConnected,
      data: {
        isServerConnected: peerConnector.peerJS.open,
      },
    })
  })

  peerConnector.peerJS.on('disconnected', () => {
    peerConnector.eventHandler({
      type: ServerEventType.ServerDisconnected,
      data: {
        isServerConnected: peerConnector.peerJS.open,
      },
    })
  })

  peerConnector.peerJS.on('close', () => {
    peerConnector.eventHandler({
      type: ServerEventType.ServerClosed,
      data: {
        isServerConnected: peerConnector.peerJS.open,
      },
    })
  })

  peerConnector.peerJS.on('error', (error: PeerError) => {
    peerConnector.eventHandler({
      type: ServerEventType.ServerError,
      error: {
        type: String(error?.type ?? 'unknown-error'),
        message: error.message,
      },
    })
  })

  peerConnector.peerJS.on('connection', (dataConnection) => {
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

    attachDataConnectionEventListeners(dataConnection, peerConnector)
  })

  peerConnector.peerJS.on('call', (mediaConnection) => {
    const connection = createMediaConnection(
      mediaConnection,
      PeerConnectionStatus.Connecting,
    )
    peerConnector.eventHandler({
      type: MediaConnectionEventType.PeerCalled,
      data: {
        connection,
      },
    })
    peerConnector.connections.set(connection.id, connection)

    attachMediaConnectionEventListeners(mediaConnection, peerConnector)
  })
}
