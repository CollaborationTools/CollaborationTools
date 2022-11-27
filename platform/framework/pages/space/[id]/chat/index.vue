<template>
  <component :is="defaultChat.listComponent" />
</template>

<script setup lang="ts">
import useSpaceStore from 'stores/useSpaceStore'
import { defaultChat } from 'tools/_default/chat'

const currentSpace = $computed(() => useSpaceStore().getCurrentSpace())

useHead({
  title: `Chats @ ${currentSpace?.name}`,
})

definePageMeta({
  layout: 'space',
})
</script>
