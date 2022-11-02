import { Device, DeviceId } from 'core/user'

export type UserId = string

type CreateUserProps = {
  device: Device
  userId: UserId
  username: string
}

export type User = Readonly<{
  currentDevice: DeviceId
  devices: Readonly<Device[]>
  id: UserId
  name: string
  privateKey: string
  publicKey: string
}>

export const createUser = ({
  device,
  userId,
  username,
}: CreateUserProps): User => {
  return {
    currentDevice: device.id,
    devices: [device],
    id: userId,
    name: username,
    privateKey: '',
    publicKey: '',
  }
}
