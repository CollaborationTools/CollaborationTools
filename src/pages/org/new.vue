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
import useOrganisations from '@/stores/useOrganisations'

definePageMeta({
  layout: 'center',
  title: 'Create new organisation',
})

const orgCount = useOrganisations().getOrganisations().length
</script>
