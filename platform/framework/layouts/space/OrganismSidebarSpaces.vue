<template>
  <div class="flex flex-col w-18 bg-white dark:bg-base-300">
    <div class="flex-1 p-2">
      <ul
        class="absolute flex flex-col text-base-content gap-4 bg-white dark:bg-base-300"
      >
        <li
          v-for="space in spaces"
          :key="space.id"
          :class="{ 'text-secondary': isCurrentSpace(space.id) }"
        >
          <AtomButtonSpace
            :name="space.name"
            :to="useSpaces().getMainSpacePath(space.id)"
            :data-uuid="space.id"
          >
            {{ useSpaces().getAbbreviation(space.name) }}
          </AtomButtonSpace>
        </li>
      </ul>
    </div>
    <ul
      class="flex flex-col text-base-content gap-4 p-2 bg-white dark:bg-base-300 z-10"
    >
      <li>
        <AtomButtonSpace
          name="Browse all spaces"
          :to="spaceRoutes.all"
        >
          <AtomIcon name="spaces" class="w-7 h-7" />
        </AtomButtonSpace>
      </li>
      <li>
        <AtomButtonSpace
          name="Add new space"
          :to="spaceRoutes.new"
          data-id="create-new-space"
        >
          <AtomIcon name="add" class="w-7 h-7" />
        </AtomButtonSpace>
      </li>
      <li>
        <AtomButtonSpace name="Your profile" :to="privateRoutes.profile">
          <AtomIcon name="profile" class="w-7 h-7" />
        </AtomButtonSpace>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import useSpaces from '@/composables/useSpaces'
import { privateRoutes, spaceRoutes } from '@/config'
import useSpaceStore from '@/stores/useSpaceStore'
import { SpaceId } from 'core/space'

import AtomButtonSpace from './AtomButtonSpace.vue'

// TODO: remove this workaround once .active-nav is always applied
const currentSpace = $computed(() => useSpaceStore().getCurrentSpace())
const isCurrentSpace = (spaceId: SpaceId): boolean =>
  currentSpace?.id === spaceId

const spaces = useSpaceStore().getSpaces()
</script>
