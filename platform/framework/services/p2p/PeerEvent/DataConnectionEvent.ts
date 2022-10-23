import { DataConnection } from '../PeerConnection'

export enum DataConnectionEventType {
  PeerConnected = 'PeerConnected',
  PeerClosed = 'PeerClosed',
  PeerError = 'PeerError',
  DataReceived = 'DataReceived',
}

export type DataConnectionEvent =
  | {
      type:
        | DataConnectionEventType.PeerConnected
        | DataConnectionEventType.PeerClosed
      data: {
        connection: DataConnection
      }
    }
  | {
      type: DataConnectionEventType.PeerError
      error: {
        connection: DataConnection
        message: string
        type: string
      }
    }
  | {
      type: DataConnectionEventType.DataReceived
      data: {
        connection: DataConnection
        message: string
      }
    }
