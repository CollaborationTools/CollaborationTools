import { ChatId, ParticipantId } from './Chat'

export type Message = Readonly<{
  chatId: ChatId
  date: string
  senderId: ParticipantId
  text: string
}>

export type Messages = Readonly<Message[]>

type CreateMessageProps = Omit<Message, 'date'>

export const createMessage = ({
  chatId,
  senderId,
  text,
}: CreateMessageProps): Message => ({
  chatId,
  date: new Date().toISOString(),
  senderId,
  text,
})
