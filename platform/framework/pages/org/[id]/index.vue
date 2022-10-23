<template>
  <div></div>
</template>

<script setup lang="ts">
import useOrganisationStore from '@/stores/useOrganisationStore'

const organisationStore = useOrganisationStore()

useHead({
  title: organisationStore.getCurrentOrganisation()?.name,
})

definePageMeta({
  layout: 'org',
})
</script>
