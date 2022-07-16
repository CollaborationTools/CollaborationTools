import { Organisation, OrganisationId } from '@/features/organisation'

export type OrganisationMap = ReadonlyMap<OrganisationId, Organisation | null>

export const setOrganisation = (
  organisations: OrganisationMap,
  organisation: Organisation,
): OrganisationMap => {
  return new Map(organisations).set(organisation.id, organisation)
}

export const deleteOrganisation = (
  organisations: OrganisationMap,
  deletedOrganisation: Organisation,
): OrganisationMap => {
  return new Map(organisations).set(deletedOrganisation.id, null)
}
