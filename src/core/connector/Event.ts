import { OrganisationMemberId } from '@/core/user'
import { createUUID } from '@/services/browser/uuid'

export type EventId = string
export type EventType = 'invite'

type CreateEventProps = {
  data: string
  senderId: OrganisationMemberId
  type: EventType
}

export type Event = Readonly<{
  data: string
  id: EventId
  senderId: OrganisationMemberId
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
