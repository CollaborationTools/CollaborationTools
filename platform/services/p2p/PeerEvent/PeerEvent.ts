import {
  DataConnectionEvent,
  DataConnectionEventType,
} from './DataConnectionEvent'
import {
  MediaConnectionEvent,
  MediaConnectionEventType,
} from './MediaConnectionEvent'
import { ServerConnectionEvent, ServerEventType } from './ServerConnectionEvent'

export type PeerEvent =
  | ServerConnectionEvent
  | DataConnectionEvent
  | MediaConnectionEvent

export const PeerEventType = {
  server: ServerEventType,
  peer: {
    data: DataConnectionEventType,
    media: MediaConnectionEventType,
  },
}
