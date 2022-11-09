<template>
  <div></div>
</template>

<script setup lang="ts">
import useSpaceStore from '@/stores/useSpaceStore'

const spaceStore = useSpaceStore()

useHead({
  title: spaceStore.getCurrentSpace()?.name,
})

definePageMeta({
  layout: 'space',
})
</script>
