<template>
  <div class="flex flex-col min-h-screen">
    <OrganismHeader />
    <main class="block p-4 md:p-8 pb-20 w-full">
      <slot />
    </main>
    <OrganismFooter />
  </div>
</template>

<script setup lang="ts">
import useOrganisationStore from '@/stores/useOrganisationStore'

const route = useRoute()
const maybeOrgId = computed(() =>
  route.params.id instanceof Array ? route.params.id[0] : route.params.id,
)

const organisationsStore = useOrganisationStore()
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
