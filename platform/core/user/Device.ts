import { createUUID } from '@/services/browser/uuid'

export type DeviceId = string

export type Device = Readonly<{
  id: DeviceId
  name: string
}>

export const createDevice = (name = 'default'): Device => {
  return {
    id: createUUID(),
    name,
  }
}
