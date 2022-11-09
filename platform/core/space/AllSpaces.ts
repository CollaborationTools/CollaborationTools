import { RecentSpaces } from './RecentSpaces'
import { Space, SpaceId, Spaces } from './Space'

export type AllSpaces = ReadonlyMap<SpaceId, Space | null>

export const setSpace = (allSpaces: AllSpaces, space: Space): AllSpaces => {
  return new Map(allSpaces).set(space.id, space)
}

export const addSpace = (
  allSpaces: AllSpaces,
  space: Space,
): { allSpaces: AllSpaces; space: Space } => {
  return {
    allSpaces: new Map(allSpaces).set(space.id, space),
    space,
  }
}

export const deleteSpace = (
  allSpaces: AllSpaces,
  deletedSpace: Space,
): AllSpaces => {
  return new Map(allSpaces).set(deletedSpace.id, null)
}

export const getSpace = (
  allSpaces: AllSpaces,
  spaceId: SpaceId,
): Space | null => allSpaces.get(spaceId) ?? null

export const getSpaces = (allSpaces: AllSpaces): Spaces => {
  const spaces = Array.from(allSpaces.values())
  return spaces.filter((space): space is Space => space !== null)
}

export const getCurrentSpace = (
  allSpaces: AllSpaces,
  recentSpaces: RecentSpaces,
): Space | null => {
  const recentSpaceId = recentSpaces.at(0)
  if (recentSpaceId === undefined) {
    return null
  }
  return allSpaces.get(recentSpaceId) ?? null
}

export const getRecentSpaces = (
  allSpaces: AllSpaces,
  recentSpaces: RecentSpaces,
): Spaces => {
  const matchedSpaces = recentSpaces.map((spaceId) =>
    allSpaces.get(spaceId ?? ''),
  )
  return matchedSpaces.filter(
    (space): space is Space => space !== null && space !== undefined,
  )
}
