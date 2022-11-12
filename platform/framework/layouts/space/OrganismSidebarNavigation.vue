<template>
  <div class="h-full w-52 md:w-56 lg:w-64 bg-stone-50 dark:bg-base-200">
    <div
      class="p-6 h-20 text-base-content text-xl font-medium truncate"
    >
      {{ currentSpace?.name }}<AtomDot />
    </div>
    <ul class="menu p-2 text-base-content">
      <li v-for="link in links" :key="link.url">
        <AtomLink :to="link.url" :label="link.label" :icon="link.icon" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { getSpaceLinksFor, SpaceLink } from '@/composables/useRouting'
import useSpaceStore from '@/stores/useSpaceStore'

const currentSpace = $computed(() => useSpaceStore().getCurrentSpace())

const links: SpaceLink[] = $computed(() =>
  currentSpace?.id ? getSpaceLinksFor(currentSpace.id) : [],
)
</script>
