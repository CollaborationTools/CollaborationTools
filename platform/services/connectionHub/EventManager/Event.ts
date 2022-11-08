import { MemberId } from 'core/organisation'
import { createUUID } from 'services/browser/uuid'

export type EventId = string
export type EventType = 'invite' | 'organisation' | 'members'

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
