import {
  PeerConnection,
  PeerConnectionId,
  PeerConnectionStatus,
} from './PeerConnection'

export type PeerConnectionsMap = Map<PeerConnectionId, PeerConnection>

export const getActiveConnectionsFrom = (
  connectionsMap: PeerConnectionsMap,
): ReadonlyArray<PeerConnection> => {
  const connections = Array.from(connectionsMap.values())

  return connections.filter(
    (connection) => connection.status === PeerConnectionStatus.Open,
  )
}
