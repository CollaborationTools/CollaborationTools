<template>
  <component :is="defaultChat.itemComponent" />
</template>

<script setup lang="ts">
import useRouting from 'composables/useRouting'
import useChatStore from 'stores/useChatStore'
import useSpaceStore from 'stores/useSpaceStore'
import useUserStore from 'stores/useUserStore'
import { defaultChat } from 'tools/_default/chat'

const maybeChatId = $computed(
  () => useRouting().getRouteParameter('chatId').value,
)

const currentSpace = $computed(() => useSpaceStore().getCurrentSpace())
const me = $computed(() => useUserStore().getMe())
const chat = $computed(() => useChatStore().getDirectChat(maybeChatId ?? ''))
const participant = $computed(() =>
  useUserStore().getMember(currentSpace?.id ?? '', chat?.participant2 ?? ''),
)

useHead({
  title: `Chat with ${participant?.name} | ${currentSpace?.name}`,
})

definePageMeta({
  layout: 'space',
})
</script>
