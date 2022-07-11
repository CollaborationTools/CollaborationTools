<template>
  <div class="flex flex-col min-h-screen">
    <OrganismHeader :recent-orgs="recentOrgsWithLinks" />
    <main>
      <slot />
    </main>
    <OrganismFooter :links="links" />
  </div>
</template>

<script setup lang="ts">
import { ComputedRef } from 'vue'

import {
  getMainOrgPathFor,
  getOrgNavigationFor,
} from '@/composables/useRouting'

export type RecentOrgWithLink = {
  id: string
  name: string
  url: string
}

const route = useRoute()
const maybeOrgId = computed(() =>
  route.params.id instanceof Array ? route.params.id[0] : route.params.id,
)

const { getOrganisation, getRecentOrganisations, setCurrentOrganisation } =
  useOrganisations()
const org = computed(() => getOrganisation(maybeOrgId.value))

watch(
  org,
  () => {
    if (org.value === null) {
      if (!route.fullPath.includes('/new')) {
        throwError('Organisation was not found')
      }
    } else {
      setCurrentOrganisation(org.value.id)
    }
  },
  { immediate: true },
)

const recentOrgsWithLinks: ComputedRef<RecentOrgWithLink[]> = computed(() =>
  getRecentOrganisations().value.map((org) => ({
    id: org.id,
    name: org.name,
    url: getMainOrgPathFor(org.id),
  })),
)

const links = computed(() =>
  org.value?.id ? getOrgNavigationFor(org.value.id) : [],
)
</script>
