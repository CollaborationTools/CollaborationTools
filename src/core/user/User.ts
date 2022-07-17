import { createUUID } from '@/services/browser/uuid'

export type User = Readonly<{
  devices: Readonly<string[]>
  id: string
  name: string
  privateKey: string
  publicKey: string
}>

export type Users = Readonly<User[]>

export const createUser = (name: string): User => {
  return {
    devices: [createUUID()],
    id: createUUID(),
    name,
    privateKey: '',
    publicKey: '',
  }
}
