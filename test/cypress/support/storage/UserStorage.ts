import {
  setOrganisation,
  createRecentOrganisations,
  MembersInAllSpaces,
  Organisation,
  Organisations,
  OrganisationMap,
  RecentOrganisations,
} from 'core/organisation'
import { User } from 'core/user'
import {
  ORGANISATIONS_KEY,
  RECENT_ORGANISATIONS_KEY,
} from 'stores/useOrganisationStore'
import { ORGANISATION_MEMBERS_KEY, USER_PROFILE_KEY } from 'stores/useUserStore'

export type UserData = {
  organisations: Organisations
  profile: User
  allOrganisationsMembers: MembersInAllSpaces
}

export type UserStorage = Map<typeof ORGANISATIONS_KEY, OrganisationMap> &
  Map<typeof RECENT_ORGANISATIONS_KEY, RecentOrganisations> &
  Map<typeof USER_PROFILE_KEY, User> &
  Map<typeof ORGANISATION_MEMBERS_KEY, MembersInAllSpaces>

export const createUserStorage = ({
  organisations,
  profile,
  allOrganisationsMembers,
}: UserData): UserStorage => {
  const orgMap: OrganisationMap = organisations.reduce(
    (orgMap: OrganisationMap, org) => setOrganisation(orgMap, org),
    new Map<string, Organisation>(),
  )

  const orgIds = organisations.map((org) => org.id)

  const recentOrganisations: RecentOrganisations =
    createRecentOrganisations(orgIds)

  const userStorage: UserStorage = new Map()
  userStorage.set(ORGANISATIONS_KEY, orgMap)
  userStorage.set(RECENT_ORGANISATIONS_KEY, recentOrganisations)
  userStorage.set(USER_PROFILE_KEY, profile)
  userStorage.set(ORGANISATION_MEMBERS_KEY, allOrganisationsMembers)
  return userStorage
}
