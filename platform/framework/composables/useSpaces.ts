import { MemberId, Space } from 'core/space'
import { createEvent } from 'services/connectionHub'

type UseSpaces = {
  createSpaceEvent: (senderId: MemberId, space: Space) => string
  getAbbreviation: (name: string) => string
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

  const getAbbreviation = (name: string, maxNumberOfLetters = 2): string =>
    name
      .split(' ')
      .map((word) => word.at(0))
      .join('')
      .slice(0, maxNumberOfLetters)

  return { createSpaceEvent, getAbbreviation }
}
