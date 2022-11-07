import { Organisation, OrganisationId } from 'core/organisation'
import {
  createDevice,
  createMember,
  createUser,
  MembersInSpace,
  setMember,
} from 'core/user'
import { createUserStorage } from 'cypress/support/storage'
import { createUUID } from 'services/browser/uuid'

const createOrganisation = (organisationName: string): Organisation => ({
  id: createUUID(),
  name: organisationName,
})

const org1 = createOrganisation('Org 1')
const org2 = createOrganisation('Org 2')
const org3 = createOrganisation('Org 3')

const organisations = [org1, org2, org3]

const newDeviceId = createUUID()
const newDevice = createDevice(newDeviceId)
const profile = createUser({
  device: newDevice,
  userId: createUUID(),
  username: 'Admin 1A',
})

const emptyOrganisationsMembers = new Map<
  OrganisationId,
  MembersInSpace | null
>()

const orgMember1 = createMember({
  devices: profile.devices.map((device) => device.id),
  id: profile.id,
  name: 'Admin 1B',
  role: 'admin',
})

const allOrganisationsMembers = setMember(
  emptyOrganisationsMembers,
  org1.id,
  orgMember1,
)

const storage = createUserStorage({
  organisations,
  profile,
  allOrganisationsMembers,
})

export default storage
