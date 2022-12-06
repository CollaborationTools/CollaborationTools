<template>
  <div class="flex flex-col gap-2 p-2 md:p-4 text-lg">
    <AtomMessage
      v-for="message in formattedMessages"
      :key="message.id"
      :message="message"
    />
  </div>
</template>

<script setup lang="ts">
import { Message, Messages } from 'core/tool/chat'

import AtomMessage from './AtomMessage.vue'

import { ChatMessage } from '../core/ChatMessage'
import { Participant } from '../core/Participant'

type Props = {
  messages: Messages
  participants: [Participant, Participant]
}

const { messages, participants } = defineProps<Props>()

const formatMessage = (
  message: Message,
  prevMessage: Message | null,
): ChatMessage => {
  const prevMessageDate = new Date(prevMessage?.date ?? 0).toLocaleDateString()
  const currentMessageDate = new Date(message.date).toLocaleDateString()
  const currentTime = new Date(message.date).toLocaleTimeString().slice(0, 5)
  const date =
    prevMessageDate === currentMessageDate
      ? currentTime
      : `${currentMessageDate} ${currentTime}`
  const sender =
    message.senderId === participants[0].id
      ? participants[0].name
      : participants[1].name
  const id = `${sender}-${Number(new Date(message.date))}`
  let hasHeader = false
  if (
    !prevMessage ||
    prevMessage.senderId !== message.senderId ||
    prevMessageDate !== currentMessageDate
  ) {
    hasHeader = true
  }
  return { date, id, sender, hasHeader, text: message.text }
}

const formattedMessages = $computed(() =>
  messages.map((message, index, array) =>
    formatMessage(message, index > 0 ? array[index - 1] ?? null : null),
  ),
)
</script>
