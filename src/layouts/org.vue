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
import useOrganisation from '@/composable/useOrganisation'
import useRouting from '@/composable/useRouting'

const org = useOrganisation().getOrganisation()

if (org === null) {
  throwError('Organisation was not found')
}

const orgName = org?.name ?? '[no organisation found]'
const links = org?.id ? useRouting().getOrgLinks(org.id) : []
</script>
