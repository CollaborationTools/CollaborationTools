<template>
  <main class="grid gap-4 prose prose-sm md:prose-base">
    <h2 class="m-0">Create new organisation<AtomDot /></h2>

    <AtomInfoBox>
      You are adding your organisation <strong>#{{ orgCount + 1 }}</strong
      >.
    </AtomInfoBox>

    <OrganismNewOrgSimpleForm />
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'center',
  title: 'Get started',
})

const orgCount = useOrganisations().getActiveOrganisations().length
</script>
