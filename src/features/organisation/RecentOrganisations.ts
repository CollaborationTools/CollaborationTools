export type RecentOrganisations = readonly string[]

const ARRAY_MAX_LENGTH = 5 as const

const removeExcess = (
  recentOrganisations: RecentOrganisations,
  limit = ARRAY_MAX_LENGTH,
): RecentOrganisations => {
  const filteredArray = recentOrganisations.filter(
    (item) => item !== null && item !== undefined,
  )
  if (filteredArray.length > ARRAY_MAX_LENGTH) {
    const excessiveArray = Array.from(filteredArray)
    excessiveArray.length = limit
    return excessiveArray
  } else return filteredArray
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
