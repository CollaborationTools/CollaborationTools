<template>
  <main class="flex flex-col gap-2 prose prose-sm sm:prose-base">
    <AtomLogo with-header />
    <AtomButton to="/org" primary data-id="get-started">Get started</AtomButton>
    <AtomButton to="/guide" primary outline data-id="learn-more"
      >Learn more</AtomButton
    >
    <AtomButton to="/tools" secondary disabled data-id="browse-tools"
      >Browse tools</AtomButton
    >
  </main>
</template>

<script setup lang="ts">
import useOrganisation from '@/composable/useOrganisation'

definePageMeta({
  layout: 'center',
  title: 'Welcome',
})

useOrganisation().redirectToOrgIfExists()
</script>
