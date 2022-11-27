import useConnectionHub from 'composables/useConnectionHub'
import useRouting from 'composables/useRouting'
import { MemberId, SpaceId } from 'core/space'
import { ChatId, createMessage } from 'core/tool/chat'
import { createEvent } from 'services/connectionHub'
import useChatStore from 'stores/useChatStore'
import useUserStore from 'stores/useUserStore'

type UseChats = {
  sendMessage: (chatId: ChatId, text: string) => void
  startChatWith: (memberId: MemberId, spaceId: SpaceId) => void
}

export default function useChats(): UseChats {
  const me = $computed(() => useUserStore().getMe())

  const sendMessage = (chatId: ChatId, text: string): void => {
    if (me?.id) {
      const message = createMessage({ chatId, senderId: me.id, text })
      useChatStore().addMessage(message)

      const chat = useChatStore().getDirectChat(message.chatId)
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
    let chat = useChatStore().findDirectChat(memberId, spaceId)

    if (!chat && me?.id) {
      chat = useChatStore().addDirectChat({
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
    sendMessage,
    startChatWith,
  }
}
