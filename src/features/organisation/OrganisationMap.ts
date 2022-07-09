import { Organisation } from '@/features/organisation/index'

export type OrganisationMap = Map<string, Organisation | null>

export const addToOrganisations = (
  organisations: OrganisationMap,
  newOrganisation: Organisation,
): OrganisationMap => {
  return new Map(organisations).set(newOrganisation.id, newOrganisation)
}

export const updateOrganisation = (
  organisations: OrganisationMap,
  updatedOrganisation: Organisation,
): OrganisationMap => {
  return new Map(organisations).set(updatedOrganisation.id, updatedOrganisation)
}

export const deleteOrganisation = (
  organisations: OrganisationMap,
  deletedOrganisation: Organisation,
): OrganisationMap => {
  return new Map(organisations).set(deletedOrganisation.id, null)
}
