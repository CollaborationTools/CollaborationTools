import {
  createMember,
  MembersInSpace,
  setMember,
  Space,
  SpaceId,
} from 'core/space'
import { createDevice, createUser } from 'core/user'
import { createUserStorage } from 'cypress/support/storage'
import { createUUID } from 'services/crypto/uuid'

const createSpace = (spaceName: string): Space => ({
  id: createUUID(),
  name: spaceName,
})

const space1 = createSpace('Space 1')
const space2 = createSpace('Space 2')
const space3 = createSpace('Space 3')

const spaces = [space1, space2, space3]

const newDeviceId = createUUID()
const newDevice = createDevice(newDeviceId)
const profile = createUser({
  device: newDevice,
  userId: createUUID(),
  username: 'Admin 1A',
})

const emptySpacesMembers = new Map<SpaceId, MembersInSpace | null>()

const member = createMember({
  devices: profile.devices.map((device) => device.id),
  id: profile.id,
  name: 'Admin 1B',
  role: 'admin',
})

const membersInAllSpaces = setMember(emptySpacesMembers, space1.id, member)

const storage = createUserStorage({
  spaces,
  profile,
  membersInAllSpaces,
})

export default storage
