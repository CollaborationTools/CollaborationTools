import { createUUID } from '@/services/browser/uuid'
import { createDevice, Device, DeviceId } from 'core/user'


export type User = Readonly<{
  currentDevice: DeviceId
  devices: Readonly<Device[]>
  id: string
  name: string
  privateKey: string
  publicKey: string
}>

export const createUser = (name: string): User => {
  const currentDevice = createDevice()
  return {
    currentDevice: currentDevice.id,
    devices: [currentDevice],
    id: createUUID(),
    name,
    privateKey: '',
    publicKey: '',
  }
}
