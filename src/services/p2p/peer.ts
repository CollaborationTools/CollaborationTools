import { DataConnection, Peer as PeerJs } from 'peerjs'

export type Peer = {
  connectTo: (remoteDeviceId: string) => void
  disconnectFrom: (remoteDeviceId: string) => void
  sendTo: (remoteDeviceId: string, data: string) => void
  exit: () => void
}

type CreatePeerParams = {
  myDeviceId: string
  dataFeed: string[]
  activeConnections: string[]
}

export const createPeer = ({
  myDeviceId,
  dataFeed,
  activeConnections,
}: CreatePeerParams): Peer => {
  let isReady = false
  let dataConnections: DataConnection[] = []
  const peer = new PeerJs(myDeviceId, { debug: 2 })

  const clearConnectionTo = (remoteDeviceId: string): void => {
    activeConnections = activeConnections.filter(
      (deviceId) => deviceId !== remoteDeviceId,
    )
    dataConnections = dataConnections.filter(
      (connection) => connection.peer !== remoteDeviceId,
    )
  }

  peer.on('error', (error) => {
    console.error('[PeerJS] ' + error)
  })

  peer.on('open', () => {
    isReady = true
  })

  peer.on('connection', (dataConnection) => {
    activeConnections.push(dataConnection.peer)
    dataConnections.push(dataConnection)

    dataConnection.on('data', (data) => {
      dataFeed.push(String(data))
    })

    dataConnection.on('close', () => {
      clearConnectionTo(dataConnection.peer)
    })

    dataConnection.on('error', (error) => {
      console.error('[PeerJS] [connection] ' + error)

      if (!dataConnection.open) {
        clearConnectionTo(dataConnection.peer)
      }
    })
  })

  const connectTo = (remoteDeviceId: string, attempt = 0): void => {
    if (isReady) {
      const newConnection = peer.connect(remoteDeviceId, {
        reliable: true,
        serialization: 'json',
      })

      newConnection.on('open', () => {
        activeConnections.push(remoteDeviceId)
        dataConnections.push(newConnection)
      })

      newConnection.on('data', (data) => {
        dataFeed.push(String(data))
      })

      newConnection.on('close', () => {
        clearConnectionTo(remoteDeviceId)
      })

      newConnection.on('error', (error) => {
        console.error('[PeerJS] [connection] ' + error)

        if (!newConnection.open) {
          clearConnectionTo(remoteDeviceId)
        }
      })
    } else if (attempt < 3) {
      setTimeout(() => {
        connectTo(remoteDeviceId, ++attempt)
      }, 1500)
    } else {
      console.error(
        `[PeerJS] Cannot connect to ${remoteDeviceId}, signaling server was not connected.`,
      )
    }
  }

  const disconnectFrom = (remoteDeviceId: string): void => {
    const dataConnection = dataConnections.find(
      (connection) => connection.peer === remoteDeviceId,
    )
    if (dataConnection) {
      dataConnection.close()
      clearConnectionTo(remoteDeviceId)
    }
  }

  const sendTo = (remoteDeviceId: string, data: string): void => {
    const dataConnection = dataConnections.find(
      (connection) => connection.peer === remoteDeviceId,
    )
    if (dataConnection) {
      if (dataConnection.open) {
        dataConnection.send(data)
      } else {
        clearConnectionTo(dataConnection.peer)
      }
    }
  }

  const exit = (): void => {
    isReady = false
    activeConnections.length = 0
    dataConnections = []
    peer.destroy()
  }

  return {
    connectTo,
    disconnectFrom,
    sendTo,
    exit,
  }
}
