import { createUserStorage } from 'cypress/support/storage'

import { createOrganisation } from '@/features/organisation'

const org1 = createOrganisation('Org 1')
const org2 = createOrganisation('Org 2')
const org3 = createOrganisation('Org 3')

const storage = createUserStorage([org1, org2, org3])

export default storage
