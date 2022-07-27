import { createDevice, Device } from '@/core/user/Device'
import { createUUID } from '@/services/browser/uuid'

export type User = Readonly<{
  devices: Readonly<Device[]>
  id: string
  name: string
  privateKey: string
  publicKey: string
}>

export type Users = Readonly<User[]>

export const createUser = (name: string): User => {
  return {
    devices: [createDevice()],
    id: createUUID(),
    name,
    privateKey: '',
    publicKey: '',
  }
}
