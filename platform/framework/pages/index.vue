<template>
  <main class="flex flex-col gap-2 prose prose-sm sm:prose-base">
    <AtomLogo with-header />
    <AtomButton :to="visitorRoutes.getStarted" primary data-id="get-started"
      >Get started</AtomButton
    >
    <AtomButton :to="visitorRoutes.guide" primary outline data-id="learn-more"
      >Learn more</AtomButton
    >
    <AtomButton
      :to="visitorRoutes.tools"
      secondary
      disabled
      data-id="browse-tools"
      >Browse tools</AtomButton
    >
  </main>
</template>

<script setup lang="ts">
import { visitorRoutes } from '@/composables/useRouting'

useHead({
  title: 'Welcome',
})

definePageMeta({
  layout: 'center',
  middleware: ['open-current-space-if-exists'],
})
</script>
