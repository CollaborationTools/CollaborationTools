import { ChatId, ParticipantId, SpaceId } from './Chat'

export type DirectChat = Readonly<{
  id: ChatId
  participant1: ParticipantId
  participant2: ParticipantId
  spaceId?: SpaceId
}>

type DirectChatProps = Pick<
  DirectChat,
  'id' | 'participant1' | 'participant2' | 'spaceId'
>

export const createDirectChat = ({
  id,
  participant1,
  participant2,
  spaceId,
}: DirectChatProps): DirectChat => ({ id, participant1, participant2, spaceId })
