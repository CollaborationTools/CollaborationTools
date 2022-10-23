import { Peer as PeerJsInstance } from 'peerjs'

import { DeviceId } from '@/core/user'

import { PeerConnectionsMap } from '../PeerConnection'
import { attachServerEventListeners, PeerEvent } from '../PeerEvent'

export type PeerConnector = {
  connections: PeerConnectionsMap
  currentDeviceId: DeviceId
  eventHandler: (peerEvent: PeerEvent) => void
  peerJS: PeerJsInstance
}

export const createPeerConnector = (
  currentDeviceId: DeviceId,
  eventHandler: (connectionEvent: PeerEvent) => void,
): PeerConnector => {
  const peerJS = new PeerJsInstance(currentDeviceId, { debug: 0 })
  const connections: PeerConnectionsMap = new Map()

  const peerConnector: PeerConnector = {
    connections,
    currentDeviceId,
    eventHandler,
    peerJS,
  }

  attachServerEventListeners(peerConnector)

  return peerConnector
}
