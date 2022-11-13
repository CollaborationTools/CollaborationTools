import { ChatId, ParticipantId } from './Chat'

export type DirectChat = Readonly<{
  id: ChatId
  participant1: ParticipantId
  participant2: ParticipantId
}>

type DirectChatProps = Pick<DirectChat, 'id' | 'participant1' | 'participant2'>

export const createDirectChat = ({
  id,
  participant1,
  participant2,
}: DirectChatProps): DirectChat => ({ id, participant1, participant2 })
