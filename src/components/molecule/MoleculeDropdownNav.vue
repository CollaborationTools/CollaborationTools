<template>
  <div class="dropdown">
    <label tabindex="0" class="btn btn-ghost" data-id="org-name">
      <span class="!normal-case text-xl">{{ currentOrgName }}<AtomDot /></span>
      <AtomIcon name="chevron-down" class="ml-2" />
    </label>
    <ul
      class="menu dropdown-content mt-6 p-2 shadow bg-white dark:bg-base-300 rounded-box min-w-max max-w-sm"
    >
      <AtomDropdownItem
        v-for="org in otherOrgs"
        :key="org.name"
        :url="org.url"
        :data-uuid="org.id"
        >{{ org.name }}</AtomDropdownItem
      >
      <li v-if="otherOrgs.length > 0" class="divider"></li>
      <li>
        <NuxtLink :to="organisationRoutes.new" data-id="create-new-org">
          <AtomIcon name="plus" class="mr-0" />
          Create new org
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ComputedRef } from 'vue'

import { getMainOrgPathFor, organisationRoutes } from '@/composables/useRouting'
import { Organisation } from '@/features/organisation'
import useOrganisations from '@/stores/useOrganisations'

type RecentOrgWithLink = Organisation & { url: string }

const recentOrganisations = computed(() =>
  useOrganisations().getRecentOrganisations(),
)

const currentOrgName = computed(() =>
  recentOrganisations.value[0]
    ? recentOrganisations.value[0].name
    : '[no organisation found]',
)

const otherOrgs: ComputedRef<RecentOrgWithLink[]> = computed(() => {
  if (recentOrganisations.value.length === 0) {
    return []
  } else {
    const currentOrgId = recentOrganisations.value[0].id
    const otherOrganisations = recentOrganisations.value.filter(
      (org) => org.id !== currentOrgId,
    )
    return otherOrganisations.map((recentOrg) => ({
      id: recentOrg.id,
      name: recentOrg.name,
      url: getMainOrgPathFor(recentOrg.id),
    }))
  }
})
</script>

<style scoped lang="postcss">
.divider:after {
  @apply hidden;
}
</style>
