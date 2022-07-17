<template>
  <div></div>
</template>

<script setup lang="ts">
import useOrganisations from '@/stores/useOrganisations'

const organisationStore = useOrganisations()

useHead({
  title: organisationStore.getCurrentOrganisation()?.name,
})

definePageMeta({
  layout: 'org',
})
</script>
