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

import { organisationRoutes } from '@/composables/useRouting'
import { RecentOrgWithLink } from '@/layouts/org.vue'

type Props = {
  recentOrgs: RecentOrgWithLink[] | null
}

const props = defineProps<Props>()
const currentOrgName = computed(() =>
  props.recentOrgs ? props.recentOrgs[0].name : '[no organisation found]',
)

const otherOrgs: ComputedRef<RecentOrgWithLink[]> = computed(() => {
  if (props.recentOrgs === null) {
    return []
  } else {
    const currentOrgId = props.recentOrgs[0].id
    return props.recentOrgs.filter((org) => org.id !== currentOrgId)
  }
})
</script>

<style scoped lang="postcss">
.divider:after {
  @apply hidden;
}
</style>
