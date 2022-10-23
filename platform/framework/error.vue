<template>
  <NuxtLayout name="center">
    <OrganismError
      error="404"
      error-message="Sorry, we couldn't find this page"
      recommended-action="But don't worry, you can find plenty of other things around."
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'en',
  },
  title: 'Page not found - Collaboration Tools',
})
</script>
