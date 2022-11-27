import { MemberId } from 'core/space'
import { createUUID } from 'services/crypto/uuid'

export type EventId = string
export type EventType = 'invite' | 'space' | 'members' | 'chat' | 'message'

type CreateEventProps = {
  data: string
  senderId: MemberId
  type: EventType
}

export type Event = Readonly<{
  data: string
  id: EventId
  senderId: MemberId
  type: EventType
}>

export const createEvent = ({
  senderId,
  data,
  type,
}: CreateEventProps): Event => ({
  data,
  id: createUUID(),
  senderId,
  type,
})
