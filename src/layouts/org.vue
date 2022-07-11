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
        return undefined
      }
    } else {
      setCurrentOrganisation(org.value.id)
    }
  },
  { immediate: true },
)

const recentOrgsWithLinks: ComputedRef<RecentOrgWithLink[] | null> = computed(
  () => {
    const recentOrgsWithLinks = getRecentOrganisations().value.map(
      (recentOrg) => ({
        id: recentOrg.id,
        name: recentOrg.name,
        url: getMainOrgPathFor(recentOrg.id),
      }),
    )
    return recentOrgsWithLinks.length > 0 ? recentOrgsWithLinks : null
  },
)

const links = computed(() =>
  org.value?.id ? getOrgNavigationFor(org.value.id) : [],
)
</script>
