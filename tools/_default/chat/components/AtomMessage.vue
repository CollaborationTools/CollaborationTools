<template>
  <div>
    <div v-if="message.hasHeader" class="flex items-center gap-4">
      <div class="font-bold">{{ message.sender }}</div>
      <div class="text-sm opacity-70">{{ message.date }}</div>
    </div>
    <div>
      {{ message.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatMessage } from '../core/ChatMessage'

type Props = {
  message: ChatMessage
}

defineProps<Props>()
</script>
