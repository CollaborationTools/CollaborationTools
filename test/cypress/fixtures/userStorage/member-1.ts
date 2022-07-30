import { createOrganisation, OrganisationId } from '@/core/organisation'
import {
  createOrganisationMember,
  createUser,
  OrganisationMembersMap,
  setOrganisationMember,
} from '@/core/user'
import { createUserStorage } from 'cypress/support/storage'

const org1 = createOrganisation('Org 1')
const org2 = createOrganisation('Org 2')
const org3 = createOrganisation('Org 3')

const organisations = [org1, org2, org3]

const profile = createUser('Admin 1A')

const emptyOrganisationsMembers = new Map<
  OrganisationId,
  OrganisationMembersMap | null
>()

const orgMember1 = createOrganisationMember({
  devices: profile.devices.map((device) => device.id),
  id: profile.id,
  name: 'Admin 1B',
  role: 'admin',
})

const allOrganisationsMembers = setOrganisationMember(
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
