<template>
  <div class="flex flex-row h-screen w-screen overflow-x-hidden">
    <div
      v-if="isSidebarVisible"
      class="flex flex-row h-screen"
      data-id="sidebar"
    >
      <OrganismSidebarSpaces @navigate="toggleSidebar" />
      <OrganismSidebarNavigation @navigate="toggleSidebar" />
    </div>
    <div
      :class="{
        'flex-1 flex flex-col h-screen w-full': true,
        'transition translate-x-5 grayscale brightness-150 dark:brightness-75':
          isSidebarVisible && isAtMostTablet,
      }"
      @click="hideSidebar"
      @keydown.esc="hideSidebar"
    >
      <OrganismHeader
        :is-sidebar-visible="isSidebarVisible"
        @toggle-sidebar="toggleSidebar"
      />
      <main class="flex-1 p-4 md:p-8 w-full min-w-min bg-base-100">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLayout from '@/composables/useLayout'
import useSpaceStore from '@/stores/useSpaceStore'
import useUserStore from '@/stores/useUserStore'

import OrganismHeader from './space/OrganismHeader.vue'
import OrganismSidebarNavigation from './space/OrganismSidebarNavigation.vue'
import OrganismSidebarSpaces from './space/OrganismSidebarSpaces.vue'

const isAtMostTablet = useLayout().isAtMostTablet
const isSidebarVisible = ref(!isAtMostTablet.value)
const toggleSidebar = (): void => {
  if (isAtMostTablet.value) isSidebarVisible.value = !isSidebarVisible.value
}
const hideSidebar = (): void => {
  if (isSidebarVisible.value) toggleSidebar()
}

const route = useRouting().getRoute()
const maybeSpaceId = $computed(() =>
  route.value.params.id instanceof Array
    ? route.value.params.id[0]
    : route.value.params.id,
)

const spaceStore = useSpaceStore()
const space = computed(() =>
  maybeSpaceId ? spaceStore.getSpace(maybeSpaceId) : null,
)

const userStore = useUserStore()
const me = userStore.getMe()

if (me && space.value) {
  const members = userStore.getMembers(space.value.id)
  useConnectionHub().runConnectionHub(me.currentDevice, members ?? [])
}

watch(
  // eslint-disable-next-line total-functions/no-unsafe-readonly-mutable-assignment
  space,
  () => {
    if (space.value === null) {
      if (!route.value.fullPath.includes('/new')) {
        createError('Space was not found')
        return undefined
      }
    } else {
      spaceStore.setCurrentSpaceId(space.value.id)
      const members = userStore.getMembers(space.value.id)
      useConnectionHub().setMembers(members ?? [])
    }
  },
  { immediate: true },
)
</script>
