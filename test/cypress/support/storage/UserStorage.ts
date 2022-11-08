import {
  createRecentSpaces,
  MembersInAllSpaces,
  Organisation,
  Organisations,
  AllSpaces,
  RecentSpaces,
  setSpace,
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

export type UserStorage = Map<typeof ORGANISATIONS_KEY, AllSpaces> &
  Map<typeof RECENT_ORGANISATIONS_KEY, RecentSpaces> &
  Map<typeof USER_PROFILE_KEY, User> &
  Map<typeof ORGANISATION_MEMBERS_KEY, MembersInAllSpaces>

export const createUserStorage = ({
  organisations,
  profile,
  allOrganisationsMembers,
}: UserData): UserStorage => {
  const orgMap: AllSpaces = organisations.reduce(
    (orgMap: AllSpaces, org) => setSpace(orgMap, org),
    new Map<string, Organisation>(),
  )

  const orgIds = organisations.map((org) => org.id)

  const recentOrganisations: RecentSpaces = createRecentSpaces(orgIds)

  const userStorage: UserStorage = new Map()
  userStorage.set(ORGANISATIONS_KEY, orgMap)
  userStorage.set(RECENT_ORGANISATIONS_KEY, recentOrganisations)
  userStorage.set(USER_PROFILE_KEY, profile)
  userStorage.set(ORGANISATION_MEMBERS_KEY, allOrganisationsMembers)
  return userStorage
}
