import { MediaConnection as PeerJsMediaConnection } from 'peerjs'

import { MediaConnectionEventType } from './MediaConnectionEvent'

import { setConnection, createMediaConnection } from '../PeerConnection'
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
  }

  mediaConnection.on('close', () => {
    const connection = createMediaConnection(mediaConnection)

    peerConnector.eventHandler({
      type: MediaConnectionEventType.PeerClosed,
      data: {
        connection,
      },
    })

    peerConnector.connections = setConnection(
      peerConnector.connections,
      connection,
    )
  })

  mediaConnection.on('error', (error: PeerError) => {
    const connection = createMediaConnection(mediaConnection)

    peerConnector.eventHandler({
      type: MediaConnectionEventType.PeerError,
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

  mediaConnection.on('stream', (stream) => {
    const connection = createMediaConnection(mediaConnection)

    peerConnector.eventHandler({
      type: MediaConnectionEventType.StreamReceived,
      data: {
        connection,
        stream,
      },
    })
  })
}
