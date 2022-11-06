import { MediaConnection as PeerJsMediaConnection } from 'peerjs'

import { MediaConnectionEventType } from './MediaConnectionEvent'

import { createMediaConnection, PeerConnectionStatus } from '../PeerConnection'
import { PeerConnector, PeerError } from '../PeerConnector'

type AttachMediaConnectionEventListenersOptions = {
  isConnectingToPeer: boolean
}

export const attachMediaConnectionEventListeners = (
  mediaConnection: PeerJsMediaConnection,
  peerConnector: PeerConnector,
  options: AttachMediaConnectionEventListenersOptions = {
    isConnectingToPeer: false,
  },
): void => {
  if (options.isConnectingToPeer) {
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
  }

  mediaConnection.on('close', () => {
    const connection = createMediaConnection(
      mediaConnection,
      PeerConnectionStatus.Closed,
    )

    peerConnector.eventHandler({
      type: MediaConnectionEventType.PeerClosed,
      data: {
        connection,
      },
    })

    peerConnector.connections.set(connection.id, connection)
  })

  mediaConnection.on('error', (error: PeerError) => {
    const status = mediaConnection.open
      ? PeerConnectionStatus.Open
      : PeerConnectionStatus.Closed
    const connection = createMediaConnection(mediaConnection, status)

    peerConnector.eventHandler({
      type: MediaConnectionEventType.PeerError,
      error: {
        connection,
        message: error.message,
        type: String(error?.type ?? 'unknown-error'),
      },
    })

    peerConnector.connections.set(connection.id, connection)
  })

  mediaConnection.on('stream', (stream) => {
    const connection = createMediaConnection(
      mediaConnection,
      PeerConnectionStatus.Open,
    )

    peerConnector.eventHandler({
      type: MediaConnectionEventType.StreamReceived,
      data: {
        connection,
        stream,
      },
    })
  })
}
