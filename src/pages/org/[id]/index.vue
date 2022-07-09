<template>
  <div></div>
</template>

<script setup lang="ts">
import useOrganisations from '@/composable/useOrganisations'

definePageMeta({
  layout: 'org',
  title: useOrganisations().getCurrentOrganisation()?.name,
})
</script>
