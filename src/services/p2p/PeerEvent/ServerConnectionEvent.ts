export enum ServerEventType {
  ServerConnected = 'ServerConnected',
  ServerDisconnected = 'ServerDisconnected',
  ServerClosed = 'ServerClosed',
  ServerError = 'ServerError',
}

export type ServerConnectionEvent =
  | {
      type:
        | ServerEventType.ServerConnected
        | ServerEventType.ServerDisconnected
        | ServerEventType.ServerClosed
      data: {
        isServerConnected: boolean
      }
    }
  | {
      type: ServerEventType.ServerError
      error: {
        type: string
        message: string
      }
    }
