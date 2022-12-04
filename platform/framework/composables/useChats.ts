import { CHAT_ID_PARAM, SPACE_ID_PARAM, spaceRoutes } from '@/config'
import useConnectionHub from 'composables/useConnectionHub'
import useRouting from 'composables/useRouting'
import { MemberId, SpaceId } from 'core/space'
import { ChatId, createMessage } from 'core/tool/chat'
import { createEvent } from 'services/connectionHub'
import useChatStore from 'stores/useChatStore'
import useUserStore from 'stores/useUserStore'

type ChatLink = Readonly<{
  label: string
  url: string
}>

type UseChats = {
  getChatLinks: (spaceId: SpaceId | undefined) => ChatLink[]
  sendMessage: (chatId: ChatId, text: string) => void
  startChatWith: (memberId: MemberId, spaceId: SpaceId) => void
}

export default function useChats(): UseChats {
  const chatStore = useChatStore()
  const userStore = useUserStore()
  const me = $computed(() => userStore.getMe())

  const getChatLinks = (spaceId: SpaceId | undefined): ChatLink[] => {
    if (spaceId === undefined) {
      return []
    }
    return chatStore
      .getDirectChatsForSpace(spaceId)
      .map((chat) => ({
        url: spaceRoutes.chat
          .replace(SPACE_ID_PARAM, spaceId)
          .replace(CHAT_ID_PARAM, chat.id),
        label:
          userStore.getMember(spaceId, chat.participant2)?.name ??
          chat.participant2,
      }))
      .sort((item1, item2) => item1.label.localeCompare(item2.label))
  }
  const sendMessage = (chatId: ChatId, text: string): void => {
    if (me?.id) {
      const message = createMessage({ chatId, senderId: me.id, text })
      useChatStore().addMessage(message)

      const chat = chatStore.getDirectChat(message.chatId)
      const recipient = chat?.participant2

      if (!recipient) {
        return
      }

      if (useChatStore().getMessages(message.chatId).length === 1) {
        const chatEvent = createEvent({
          senderId: me.id,
          data: JSON.stringify(chat),
          type: 'chat',
        })
        useConnectionHub().sendDataTo(recipient, JSON.stringify(chatEvent))
      }

      const event = createEvent({
        senderId: me.id,
        data: JSON.stringify(message),
        type: 'message',
      })
      useConnectionHub().sendDataTo(recipient, JSON.stringify(event))
    }
  }

  const startChatWith = (memberId: MemberId, spaceId: SpaceId): void => {
    let chat = chatStore.findDirectChat(memberId, spaceId)

    if (!chat && me?.id) {
      chat = chatStore.addDirectChat({
        me: me.id,
        otherParticipant: memberId,
        spaceId,
      })
    }
    if (chat) {
      useRouting().openChat(spaceId, chat.id)
    }
  }

  return {
    getChatLinks,
    sendMessage,
    startChatWith,
  }
}
