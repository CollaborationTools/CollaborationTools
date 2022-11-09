import {
  AllSpaces,
  createRecentSpaces,
  MembersInAllSpaces,
  RecentSpaces,
  setSpace,
  Space,
  Spaces,
} from 'core/space'
import { User } from 'core/user'
import { SPACES_KEY, RECENT_SPACES_KEY } from 'stores/useSpaceStore'
import { SPACE_MEMBERS_KEY, USER_PROFILE_KEY } from 'stores/useUserStore'

export type UserData = {
  spaces: Spaces
  profile: User
  membersInAllSpaces: MembersInAllSpaces
}

export type UserStorage = Map<typeof SPACES_KEY, AllSpaces> &
  Map<typeof RECENT_SPACES_KEY, RecentSpaces> &
  Map<typeof USER_PROFILE_KEY, User> &
  Map<typeof SPACE_MEMBERS_KEY, MembersInAllSpaces>

export const createUserStorage = ({
  spaces,
  profile,
  membersInAllSpaces,
}: UserData): UserStorage => {
  const allSpaces: AllSpaces = spaces.reduce(
    (allSpaces: AllSpaces, space) => setSpace(allSpaces, space),
    new Map<string, Space>(),
  )

  const spaceIds = spaces.map((space) => space.id)

  const recentSpaces = createRecentSpaces(spaceIds)

  const userStorage = new Map()
  userStorage.set(SPACES_KEY, allSpaces)
  userStorage.set(RECENT_SPACES_KEY, recentSpaces)
  userStorage.set(USER_PROFILE_KEY, profile)
  userStorage.set(SPACE_MEMBERS_KEY, membersInAllSpaces)
  return userStorage
}
