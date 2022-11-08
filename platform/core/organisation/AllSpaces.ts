import { Organisation, OrganisationId, Organisations } from './Organisation'
import { RecentSpaces } from './RecentSpaces'

export type AllSpaces = ReadonlyMap<OrganisationId, Organisation | null>

export const setSpace = (
  allSpaces: AllSpaces,
  space: Organisation,
): AllSpaces => {
  return new Map(allSpaces).set(space.id, space)
}

export const addSpace = (
  allSpaces: AllSpaces,
  space: Organisation,
): { allSpaces: AllSpaces; space: Organisation } => {
  return {
    allSpaces: new Map(allSpaces).set(space.id, space),
    space,
  }
}

export const deleteSpace = (
  allSpaces: AllSpaces,
  deletedSpace: Organisation,
): AllSpaces => {
  return new Map(allSpaces).set(deletedSpace.id, null)
}

export const getSpace = (
  allSpaces: AllSpaces,
  spaceId: OrganisationId,
): Organisation | null => allSpaces.get(spaceId) ?? null

export const getSpaces = (allSpaces: AllSpaces): Organisations => {
  const spaces = Array.from(allSpaces.values())
  return spaces.filter((space): space is Organisation => space !== null)
}

export const getCurrentSpace = (
  allSpaces: AllSpaces,
  recentSpaces: RecentSpaces,
): Organisation | null => {
  const recentSpaceId = recentSpaces.at(0)
  if (recentSpaceId === undefined) {
    return null
  }
  return allSpaces.get(recentSpaceId) ?? null
}

export const getRecentSpaces = (
  allSpaces: AllSpaces,
  recentSpaces: RecentSpaces,
): Organisations => {
  const matchedSpaces = recentSpaces.map((spaceId) =>
    allSpaces.get(spaceId ?? ''),
  )
  return matchedSpaces.filter(
    (space): space is Organisation => space !== null && space !== undefined,
  )
}
