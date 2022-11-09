<template>
  <div class="dropdown">
    <label tabindex="0" class="btn btn-ghost" data-id="space-name">
      <span class="!normal-case text-xl"
        >{{ currentSpaceName }}<AtomDot
      /></span>
      <AtomIcon name="chevron-down" class="ml-2" />
    </label>
    <ul
      class="menu dropdown-content mt-6 p-2 shadow bg-white dark:bg-base-300 rounded-box min-w-max max-w-sm"
    >
      <AtomDropdownItem
        v-for="space in otherSpaces"
        :key="space.name"
        :url="space.url"
        :data-uuid="space.id"
        >{{ space.name }}</AtomDropdownItem
      >
      <li v-if="otherSpaces.length > 0" class="divider"></li>
      <li>
        <NuxtLink :to="spaceRoutes.new" data-id="create-new-space">
          <AtomIcon name="plus" class="mr-0" />
          Create new space
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ComputedRef } from 'vue'

import { getMainSpacePathFor, spaceRoutes } from '@/composables/useRouting'
import useSpaceStore from '@/stores/useSpaceStore'
import { Space } from 'core/space'

type RecentSpaceWithLink = Space & { url: string }

const recentSpaces = computed(() => useSpaceStore().getRecentSpaces())

const currentSpaceName = computed(
  () => recentSpaces.value[0]?.name ?? '[no space found]',
)

const otherSpaces: ComputedRef<RecentSpaceWithLink[]> = computed(() => {
  if (recentSpaces.value.length === 0) {
    return []
  } else {
    const currentSpaceId = recentSpaces.value.at(0)?.id ?? ''
    const otherSpaces = recentSpaces.value.filter(
      (space) => space.id !== currentSpaceId,
    )
    return otherSpaces.map((recentSpace) => ({
      id: recentSpace.id,
      name: recentSpace.name,
      url: getMainSpacePathFor(recentSpace.id),
    }))
  }
})
</script>

<style scoped lang="postcss">
.divider:after {
  @apply hidden;
}
</style>
