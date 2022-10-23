import { PeerConnection, PeerConnectionId } from './PeerConnection'

export type PeerConnectionsMap = ReadonlyMap<PeerConnectionId, PeerConnection>

export const setConnection = (
  peerConnectionsMap: PeerConnectionsMap,
  peerConnection: PeerConnection,
): PeerConnectionsMap => {
  return new Map(peerConnectionsMap).set(peerConnection.id, peerConnection)
}
