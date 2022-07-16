<template>
  <div class="flex flex-col min-h-screen">
    <OrganismHeader />
    <main>
      <slot />
    </main>
    <OrganismFooter />
  </div>
</template>

<script setup lang="ts">
import useOrganisations from '@/stores/useOrganisations'

const route = useRoute()
const maybeOrgId = computed(() =>
  route.params.id instanceof Array ? route.params.id[0] : route.params.id,
)

const organisationsStore = useOrganisations()
const org = computed(() =>
  maybeOrgId.value
    ? organisationsStore.getOrganisation(maybeOrgId.value)
    : null,
)

watch(
  // eslint-disable-next-line total-functions/no-unsafe-readonly-mutable-assignment
  org,
  () => {
    if (org.value === null) {
      if (!route.fullPath.includes('/new')) {
        throwError('Organisation was not found')
        return undefined
      }
    } else {
      organisationsStore.setCurrentOrganisationId(org.value.id)
    }
  },
  { immediate: true },
)
</script>
