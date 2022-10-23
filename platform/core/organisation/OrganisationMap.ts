import {
  createOrganisation,
  Organisation,
  OrganisationId,
  Organisations,
  RecentOrganisations,
} from 'core/organisation'

export type OrganisationMap = ReadonlyMap<OrganisationId, Organisation | null>

export const setOrganisation = (
  organisationsMap: OrganisationMap,
  organisation: Organisation,
): OrganisationMap => {
  return new Map(organisationsMap).set(organisation.id, organisation)
}

export const addOrganisation = (
  organisationsMap: OrganisationMap,
  organisationName: string,
): { organisationMap: OrganisationMap; organisation: Organisation } => {
  const organisation = createOrganisation(organisationName)
  return {
    organisationMap: new Map(organisationsMap).set(
      organisation.id,
      organisation,
    ),
    organisation,
  }
}

export const deleteOrganisation = (
  organisationsMap: OrganisationMap,
  deletedOrganisation: Organisation,
): OrganisationMap => {
  return new Map(organisationsMap).set(deletedOrganisation.id, null)
}

export const getOrganisation = (
  organisationsMap: OrganisationMap,
  organisationId: OrganisationId,
): Organisation | null => organisationsMap.get(organisationId) || null

export const getOrganisations = (
  organisationsMap: OrganisationMap,
): Organisations => {
  const organisations = Array.from(organisationsMap.values())
  return organisations.filter(
    (organisation): organisation is Organisation => organisation !== null,
  )
}

export const getCurrentOrganisation = (
  organisationsMap: OrganisationMap,
  recentOrganisations: RecentOrganisations,
): Organisation | null => {
  const recentOrganisationId = recentOrganisations.at(0)
  if (recentOrganisationId === undefined) {
    return null
  }
  return organisationsMap.get(recentOrganisationId) || null
}

export const getRecentOrganisations = (
  organisationsMap: OrganisationMap,
  recentOrganisations: RecentOrganisations,
): Organisations => {
  const matchedOrganisations = recentOrganisations.map((organisationId) =>
    organisationsMap.get(organisationId ?? ''),
  )
  return matchedOrganisations.filter(
    (organisation): organisation is Organisation =>
      organisation !== null && organisation !== undefined,
  )
}
