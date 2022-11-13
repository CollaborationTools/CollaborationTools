import { Chat, ChatId } from './Chat'

export type AllChats = ReadonlyMap<ChatId, Chat | null>

export const getChat = (
  allChats: AllChats, chatId: ChatId,
): Chat | null => allChats.get(chatId) ?? null

export const setChat = (allChats: AllChats, chat: Chat): AllChats =>
  new Map(allChats).set(chat.id, chat)
