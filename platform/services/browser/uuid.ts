// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - no types for latest version of uuid lib
import { v4 as uuidV4 } from 'uuid'

export const createUUID = (): string =>
  window.crypto.randomUUID ? window.crypto.randomUUID() : uuidV4()
