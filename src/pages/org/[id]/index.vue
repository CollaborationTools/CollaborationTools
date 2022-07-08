<template>
  <div></div>
</template>

<script setup lang="ts">
import useOrganisation from '@/composable/useOrganisation'

definePageMeta({
  layout: 'org',
  title: useOrganisation().getOrganisation()?.name,
})
</script>
