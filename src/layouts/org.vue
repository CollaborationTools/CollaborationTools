<template>
  <div class="flex flex-col min-h-screen">
    <OrganismHeader :org-name="orgName" />
    <main>
      <slot />
    </main>
    <OrganismFooter :links="links" />
  </div>
</template>

<script setup lang="ts">
import { getOrgNavigationFor } from '@/composables/useRouting'

const route = useRoute()

const maybeOrgId =
  route.params.id instanceof Array ? route.params.id[0] : route.params.id

const { getOrganisation, setCurrentOrganisation } = useOrganisations()

const org = getOrganisation(maybeOrgId)

if (org === null) {
  throwError('Organisation was not found')
} else {
  setCurrentOrganisation(org.id)
}

const orgName = org?.name ?? '[no organisation found]'
const links = org?.id ? getOrgNavigationFor(org.id) : []
</script>
