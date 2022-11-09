<template>
  <main class="grid gap-4 prose prose-sm md:prose-base">
    <h2 class="m-0">Create new space<AtomDot /></h2>

    <AtomInfoBox>
      You are adding your space <strong>#{{ spaceCount + 1 }}</strong
      >.
    </AtomInfoBox>

    <OrganismNewSpaceSimpleForm />
    <AtomBackButton />
  </main>
</template>

<script setup lang="ts">
import useSpaceStore from '@/stores/useSpaceStore'

useHead({
  title: 'Create new space',
})

definePageMeta({
  layout: 'center',
})

const spaceCount = useSpaceStore().getSpaces().length
</script>
