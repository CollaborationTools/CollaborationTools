<template>
  <div class="dropdown">
    <label tabindex="0" class="btn btn-ghost" data-id="org-name">
      <span class="!normal-case text-xl">{{ orgName }}<AtomDot /></span>
      <AtomIcon name="chevron-down" class="ml-2" />
    </label>
    <ul
      class="menu dropdown-content mt-6 p-2 shadow bg-white dark:bg-base-300 rounded-box min-w-max max-w-sm"
    >
      <AtomDropdownItem
        v-for="org in sampleOrgData"
        :key="org.name"
        :url="org.url"
        :badge="org.notifications"
        >{{ org.name }}</AtomDropdownItem
      >
      <li class="divider"></li>
      <li>
        <NuxtLink to="/org/new" data-id="create-new-org">
          <AtomIcon name="plus" class="mr-0" />
          Create new org
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
type Props = {
  orgName: string
}

const props = defineProps<Props>()

const sampleOrgData = [
  { url: '/', name: 'Remote organisation', notifications: 1 },
  { url: '/', name: 'Sample group', notifications: 0 },
  { url: '/', name: 'Local cooperative', notifications: 3 },
  { url: '/', name: 'Another organisation', notifications: 101 },
]
</script>

<style scoped lang="postcss">
.divider:after {
  @apply hidden;
}
</style>
