export type DeviceId = string

export type Device = Readonly<{
  id: DeviceId
  name: string
}>

export const createDevice = (id: DeviceId, name = 'default'): Device => {
  return {
    id,
    name,
  }
}
