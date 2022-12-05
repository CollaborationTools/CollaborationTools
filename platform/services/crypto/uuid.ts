import { v4 as uuidV4 } from 'uuid'

export const createUUID = (): string =>
  window.crypto.randomUUID ? window.crypto.randomUUID() : uuidV4()
