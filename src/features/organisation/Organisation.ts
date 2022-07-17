import { createUUID } from '@/services/browser/uuid'

export type OrganisationId = string

export type Organisation = Readonly<{
  id: OrganisationId
  name: string
}>
export type Organisations = Readonly<Organisation[]>

export const createOrganisation = (name: string): Organisation => {
  return {
    id: createUUID(),
    name,
  }
}
