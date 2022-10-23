import { PeerErrorType } from 'peerjs'

export type PeerError = Error & {
  type?: PeerErrorType
}
