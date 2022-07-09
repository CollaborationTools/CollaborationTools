export type RecentOrganisations = readonly (string | undefined)[]

const ARRAY_MAX_LENGTH = 5 as const

const removeExcess = (
  recentOrganisations: RecentOrganisations,
  limit = ARRAY_MAX_LENGTH,
): RecentOrganisations => {
  if (recentOrganisations.length > ARRAY_MAX_LENGTH) {
    const result = Array.from(recentOrganisations)
    result.length = limit
    return result
  } else return recentOrganisations
}

export const createRecentOrganisations = (
  previousData?: string[],
): RecentOrganisations => {
  const result = previousData ? Array.from(previousData) : []
  removeExcess(result)
  return result
}

export const setFirstOrganisation = (
  recentOrganisations: RecentOrganisations,
  organisationId: string,
): RecentOrganisations => {
  const result = recentOrganisations.includes(organisationId)
    ? [
        organisationId,
        ...recentOrganisations.filter((id) => id !== organisationId),
      ]
    : [organisationId, ...recentOrganisations]
  return removeExcess(result)
}

export const removeRecentOrganisation = (
  recentOrganisations: RecentOrganisations,
  deletedOrganisationId: string,
): RecentOrganisations => {
  return recentOrganisations.filter((id) => id !== deletedOrganisationId)
}
