import { Chat, ChatId } from './Chat'

export type AllChats<Type extends Chat = Chat> = ReadonlyMap<
  ChatId,
  Type | null
>

export const getChat = <Type extends Chat = Chat>(
  allChats: AllChats<Type>,
  chatId: ChatId,
): Type | null => allChats.get(chatId) ?? null

export const setChat = <Type extends Chat = Chat>(
  allChats: AllChats<Type>,
  chat: Type,
): AllChats<Type> => new Map(allChats).set(chat.id, chat)

export const getChats = <Type extends Chat = Chat>(
  allChats: AllChats<Type>,
): Readonly<Type[]> => {
  const chats = Array.from(allChats.values())
  return chats.filter((chat): chat is Type => chat !== null)
}
