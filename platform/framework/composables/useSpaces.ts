import { SPACE_ID_PARAM, spaceRoutes } from '@/config'
import { MemberId, Space, SpaceId } from 'core/space'
import { createEvent } from 'services/connectionHub'

type UseSpaces = {
  createSpaceEvent: (senderId: MemberId, space: Space) => string
  getAbbreviation: (name: string | undefined) => string
  getMainSpacePathFor: (spaceId: SpaceId) => string
}

export default function useSpaces(): UseSpaces {
  const createSpaceEvent = (senderId: MemberId, space: Space): string => {
    const data = JSON.stringify(space)
    const event = createEvent({
      data,
      senderId,
      type: 'space',
    })
    return JSON.stringify(event)
  }

  const getAbbreviation = (
    name: string | undefined,
    maxNumberOfLetters = 3,
  ): string => {
    if (name === undefined) return ''
    return name
      .split(' ')
      .map((word) => word.at(0))
      .join('')
      .slice(0, maxNumberOfLetters)
  }

  const getMainSpacePathFor = (spaceId: SpaceId): string =>
    spaceRoutes.index.replace(SPACE_ID_PARAM, spaceId)

  return { createSpaceEvent, getAbbreviation, getMainSpacePathFor }
}
