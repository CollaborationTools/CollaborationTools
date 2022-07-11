import {
  ORGANISATIONS_KEY,
  RECENT_ORGANISATIONS_KEY,
} from '@/composables/useOrganisations'
import {
  addToOrganisations,
  createRecentOrganisations,
  Organisation,
  OrganisationMap,
  RecentOrganisations,
} from '@/features/organisation'

export type UserStorage = Map<typeof ORGANISATIONS_KEY, OrganisationMap> &
  Map<typeof RECENT_ORGANISATIONS_KEY, RecentOrganisations>

export const createUserStorage = (
  organisations: Organisation[],
): UserStorage => {
  const orgMap: OrganisationMap = organisations.reduce(
    (orgMap: OrganisationMap, org) => addToOrganisations(orgMap, org),
    new Map<string, Organisation>(),
  )

  const orgIds = organisations.map((org) => org.id)

  const recentOrganisations: RecentOrganisations =
    createRecentOrganisations(orgIds)

  const userStorage: UserStorage = new Map()
  userStorage.set(ORGANISATIONS_KEY, orgMap)
  userStorage.set(RECENT_ORGANISATIONS_KEY, recentOrganisations)
  return userStorage
}
