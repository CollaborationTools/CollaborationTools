import { MemberId, Space } from 'core/space'
import { createEvent } from 'services/connectionHub'

type UseSpaces = {
  createSpaceEvent: (senderId: MemberId, space: Space) => string
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

  return { createSpaceEvent }
}
