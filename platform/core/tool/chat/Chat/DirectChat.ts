import { ChatId, ParticipantId, SpaceId } from './Chat'

export type DirectChat = Readonly<{
  id: ChatId
  participant1: ParticipantId
  participant2: ParticipantId
  spaceId?: SpaceId
  unreadMessages?: number
}>

type DirectChatProps = Omit<DirectChat, ''>

export const createDirectChat = ({
  id,
  participant1,
  participant2,
  spaceId,
  unreadMessages,
}: DirectChatProps): DirectChat => ({
  id,
  participant1,
  participant2,
  spaceId,
  unreadMessages: unreadMessages ?? 0,
})
