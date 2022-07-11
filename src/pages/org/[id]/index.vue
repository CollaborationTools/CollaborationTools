<template>
  <div></div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'org',
  title: useOrganisations().getCurrentOrganisation().value?.name,
})
</script>
