import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

import {
  AllChats,
  ChatId,
  DirectChat,
  ParticipantId,
  SpaceId,
  createDirectChat,
  getChat,
  getChats,
  setChat,
  Message,
  Messages,
} from 'core/tool/chat'
import { createUUID } from 'services/crypto/uuid'

export const DIRECT_CHATS_KEY = 'directChats' as const
export const MESSAGES_KEY = 'messages' as const

type AddDirectChatProps = {
  me: ParticipantId
  otherParticipant: ParticipantId
  spaceId: SpaceId
}

export default defineStore('chats', {
  state: () => ({
    allDirectChats: useStorage<AllChats<DirectChat>>(
      DIRECT_CHATS_KEY,
      new Map<ChatId, DirectChat | null>(),
    ),
    messages: new Map<ChatId, Messages>(),
  }),
  getters: {
    getDirectChat(state) {
      return (chatId: ChatId): DirectChat | null =>
        getChat(state.allDirectChats, chatId)
    },
    getDirectChats(state) {
      return (): Readonly<DirectChat[]> => getChats(state.allDirectChats)
    },
    getDirectChatsForSpace(state) {
      return (spaceId: SpaceId): Readonly<DirectChat[]> =>
        getChats(state.allDirectChats).filter(
          (chat) => chat.spaceId === spaceId,
        )
    },
    getMessages(state) {
      return (chatId: ChatId): Messages => {
        let messages = state.messages.get(chatId) ?? null
        if (!messages) {
          messages = JSON.parse(
            localStorage.getItem(`messages-${chatId}`) ?? '[]',
          )
          state.messages.set(chatId, messages ?? [])
        }
        return messages ?? []
      }
    },
    findDirectChat(state) {
      return (
        participantId: ParticipantId,
        spaceId: SpaceId,
      ): Readonly<DirectChat | null> =>
        getChats(state.allDirectChats).find(
          (chat) =>
            (chat.participant1 === participantId ||
              chat.participant2 === participantId) &&
            chat.spaceId === spaceId,
        ) ?? null
    },
    findDirectChatByParticipantId(state) {
      return (participantId: ParticipantId): Readonly<DirectChat[]> =>
        getChats(state.allDirectChats).filter(
          (chat) =>
            chat.participant1 === participantId ||
            chat.participant2 === participantId,
        )
    },
  },
  actions: {
    addDirectChat({
      me,
      otherParticipant,
      spaceId,
    }: AddDirectChatProps): DirectChat {
      const existingChat = this.findDirectChat(otherParticipant, spaceId)

      const chatId = createUUID()
      const chat = createDirectChat({
        id: chatId,
        participant1: me,
        participant2: otherParticipant,
        spaceId,
      })
      this.allDirectChats = setChat(this.allDirectChats, chat)
      return existingChat ?? chat
    },
    setDirectChat(chat: DirectChat): void {
      this.allDirectChats = setChat(this.allDirectChats, chat)
    },
    addMessage(message: Message): Message {
      const chatId = message.chatId
      const chat = getChat(this.allDirectChats, chatId)
      if (!chat) {
        return message
      }

      const messages = this.getMessages(chatId)
      const newMessages = [...messages, message].sort((a, b) =>
        a.date > b.date ? 1 : 0,
      )
      this.messages.set(chatId, newMessages)
      localStorage.setItem(
        `${MESSAGES_KEY}-${chatId}`,
        JSON.stringify(newMessages),
      )

      if (message.senderId === chat.participant1) {
        return message
      }

      const updatedChat = createDirectChat({
        id: chatId,
        participant1: chat.participant1,
        participant2: chat.participant2,
        spaceId: chat.spaceId,
        unreadMessages: 1 + (chat.unreadMessages ?? 0),
      })
      this.allDirectChats = setChat(this.allDirectChats, updatedChat)

      return message
    },
    readMessages(chatId: ChatId): void {
      const chat = getChat(this.allDirectChats, chatId)
      if (!chat) {
        return
      }
      const updatedChat = createDirectChat({
        id: chatId,
        participant1: chat.participant1,
        participant2: chat.participant2,
        spaceId: chat.spaceId,
        unreadMessages: 0,
      })
      this.allDirectChats = setChat(this.allDirectChats, updatedChat)
    },
  },
})
