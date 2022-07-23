<template>
  <footer
    class="flex place-self-center fixed max-w-3xl md:max-w-2xl lg:max-w-4xl w-full h-16 bottom-0 md:bottom-2 md:rounded-2xl bg-white dark:bg-base-300 md:shadow-xl"
    data-id="navigation-links"
  >
    <AtomNavLink
      v-for="link in navigationLinks"
      :key="link.url"
      :to="link.url"
      :label="link.label"
    >
      <AtomIcon v-if="link.icon" :name="link.icon" class="h-6 w-6" />
    </AtomNavLink>
  </footer>
</template>

<script setup lang="ts">
import { ComputedRef } from 'vue'

import { getOrgNavigationFor, NavLink } from '@/composables/useRouting'
import useOrganisationStore from '@/stores/useOrganisationStore'

const currentOrganisation = computed(() =>
  useOrganisationStore().getCurrentOrganisation(),
)

const navigationLinks: ComputedRef<NavLink[]> = computed(() =>
  currentOrganisation.value?.id
    ? getOrgNavigationFor(currentOrganisation.value.id)
    : [],
)
</script>
