import { MediaConnection } from '../PeerConnection'

export enum MediaConnectionEventType {
  PeerCalled = 'PeerCalled',
  PeerClosed = 'PeerClosed',
  PeerError = 'PeerError',
  StreamReceived = 'StreamReceived',
}

export type MediaConnectionEvent =
  | {
      type:
        | MediaConnectionEventType.PeerCalled
        | MediaConnectionEventType.PeerClosed
      data: {
        connection: MediaConnection
      }
    }
  | {
      type: MediaConnectionEventType.PeerError
      error: {
        connection: MediaConnection
        message: string
        type: string
      }
    }
  | {
      type: MediaConnectionEventType.StreamReceived
      data: {
        connection: MediaConnection
        stream: MediaStream
      }
    }
