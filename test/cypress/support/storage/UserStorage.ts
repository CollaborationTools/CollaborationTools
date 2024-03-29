import {
  AllSpaces,
  MembersInAllSpaces,
  setSpace,
  Space,
  SpaceId,
  Spaces,
} from 'core/space'
import { User } from 'core/user'
import { SPACES_KEY, CURRENT_SPACE_KEY } from 'stores/useSpaceStore'
import { MEMBERS_KEY, USER_PROFILE_KEY } from 'stores/useUserStore'

export type UserData = {
  spaces: Spaces
  profile: User
  membersInAllSpaces: MembersInAllSpaces
}

export type UserStorage = Map<typeof SPACES_KEY, AllSpaces> &
  Map<typeof CURRENT_SPACE_KEY, SpaceId> &
  Map<typeof USER_PROFILE_KEY, User> &
  Map<typeof MEMBERS_KEY, MembersInAllSpaces>

export const createUserStorage = ({
  spaces,
  profile,
  membersInAllSpaces,
}: UserData): UserStorage => {
  const allSpaces: AllSpaces = spaces.reduce(
    (allSpaces: AllSpaces, space) => setSpace(allSpaces, space),
    new Map<string, Space>(),
  )

  const spaceId = spaces?.[0]?.id ?? null

  const userStorage = new Map()
  userStorage.set(SPACES_KEY, allSpaces)
  userStorage.set(CURRENT_SPACE_KEY, spaceId)
  userStorage.set(USER_PROFILE_KEY, profile)
  userStorage.set(MEMBERS_KEY, membersInAllSpaces)
  return userStorage
}
