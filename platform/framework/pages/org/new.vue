<template>
  <main class="grid gap-4 prose prose-sm md:prose-base">
    <h2 class="m-0">Create new organisation<AtomDot /></h2>

    <AtomInfoBox>
      You are adding your organisation <strong>#{{ orgCount + 1 }}</strong
      >.
    </AtomInfoBox>

    <OrganismNewOrgSimpleForm />
    <AtomBackButton />
  </main>
</template>

<script setup lang="ts">
import useOrganisationStore from '@/stores/useOrganisationStore'

useHead({
  title: 'Create new organisation',
})

definePageMeta({
  layout: 'center',
})

const orgCount = useOrganisationStore().getOrganisations().length
</script>
