import { DataConnectionEventType } from './DataConnectionEvent'
import { attachDataConnectionEventListeners } from './DataConnectionEventListener'
import { MediaConnectionEventType } from './MediaConnectionEvent'
import { attachMediaConnectionEventListeners } from './MediaConnectionEventListener'
import { ServerEventType } from './ServerConnectionEvent'

import {
  createDataConnection,
  createMediaConnection,
  setConnection,
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

    attachDataConnectionEventListeners(dataConnection, peerConnector)
  })

  peerConnector.peerJS.on('call', (mediaConnection) => {
    const connection = createMediaConnection(mediaConnection)
    peerConnector.eventHandler({
      type: MediaConnectionEventType.PeerCalling,
      data: {
        connection,
      },
    })
    peerConnector.connections = setConnection(
      peerConnector.connections,
      connection,
    )

    attachMediaConnectionEventListeners(mediaConnection, peerConnector)
  })
}
