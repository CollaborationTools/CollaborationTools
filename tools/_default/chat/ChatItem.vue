<template>
  <div class="flex flex-col w-full h-full p-0 overflow-hidden">
    <MoleculeMessageList
      class="flex-1 overflow-auto overflow-x"
      :messages="messages"
      :participants="participants"
    />
    <MoleculeMessageCreator @send="sendMessage" />
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

const maybeChatId = $computed(
  () => useRouting().getRouteParameter('chatId').value,
)
const currentSpace = $computed(() => useSpaceStore().getCurrentSpace())
const me = useUserStore().getMe()
const chat = $computed(() => useChatStore().getDirectChat(maybeChatId ?? ''))
const participant = $computed(() =>
  useUserStore().getMember(currentSpace?.id ?? '', chat?.participant2 ?? ''),
)
const messages = $computed(() =>
  chat?.id ? useChatStore().getMessages(chat.id) : [],
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

const sendMessage = (newText: string): void => {
  if (chat) {
    useChats().sendMessage(chat.id, newText)
  }
}
</script>
