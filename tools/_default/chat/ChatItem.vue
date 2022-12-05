<template>
  <div class="flex flex-col w-full h-full p-0 overflow-hidden">
    <MoleculeMessageList
      class="flex-1 overflow-auto overflow-x"
      :messages="messages"
      :participants="participants"
    />
    <MoleculeMessageCreator @focus="readMessages" @send="sendMessage" />
  </div>
</template>

<script setup lang="ts">
import useChats from 'composables/useChats'
import useRouting from 'composables/useRouting'
import useChatStore from 'stores/useChatStore'
import useSpaceStore from 'stores/useSpaceStore'
import useUserStore from 'stores/useUserStore'

import MoleculeMessageCreator from './components/MoleculeMessageCreator.vue'
import MoleculeMessageList from './components/MoleculeMessageList.vue'
import { Participant } from './core/Participant'

const chatStore = useChatStore()
const userStore = useUserStore()

const maybeChatId = $computed(
  () => useRouting().getRouteParameter('chatId').value,
)
const currentSpace = $computed(() => useSpaceStore().getCurrentSpace())
const me = userStore.getMe()
const chat = $computed(() => chatStore.getDirectChat(maybeChatId ?? ''))
const participant = $computed(() =>
  userStore.getMember(currentSpace?.id ?? '', chat?.participant2 ?? ''),
)
const messages = $computed(() =>
  chat?.id ? chatStore.getMessages(chat.id) : [],
)
const participants: [Participant, Participant] = [
  {
    id: me?.id ?? '',
    name: me?.name ?? '',
  },
  {
    id: participant?.id ?? '',
    name: participant?.name ?? '',
  },
]

const readMessages = (): void => {
  if (chat) {
    chatStore.readMessages(chat.id)
  }
}

const sendMessage = (newText: string): void => {
  if (chat) {
    chatStore.readMessages(chat.id)
    useChats().sendMessage(chat.id, newText)
  }
}

readMessages()
</script>
