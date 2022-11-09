export type RecentSpaces = Readonly<string[]>

const ARRAY_MAX_LENGTH = 5 as const

const removeExcess = (
  recentSpaces: RecentSpaces,
  limit = ARRAY_MAX_LENGTH,
): RecentSpaces => {
  const filteredArray = recentSpaces.filter(
    (item) => item !== null && item !== undefined,
  )
  if (filteredArray.length > limit) {
    const excessiveArray = Array.from(filteredArray)
    excessiveArray.length = limit
    return excessiveArray
  } else return filteredArray
}

export const createRecentSpaces = (previousData?: string[]): RecentSpaces => {
  const result = previousData ? Array.from(previousData) : []
  removeExcess(result)
  return result
}

export const setMostRecentSpace = (
  recentSpaces: RecentSpaces,
  spaceId: string,
): RecentSpaces => {
  const result = recentSpaces.includes(spaceId)
    ? [spaceId, ...recentSpaces.filter((id) => id !== spaceId)]
    : [spaceId, ...recentSpaces]
  return removeExcess(result)
}

export const removeRecentSpace = (
  recentSpaces: RecentSpaces,
  deletedSpaceId: string,
): RecentSpaces => {
  return recentSpaces.filter((id) => id !== deletedSpaceId)
}
