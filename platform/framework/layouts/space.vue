<template>
  <div class="flex flex-row h-screen w-screen overflow-hidden">
    <div
      v-if="isSidebarVisible"
      ref="sidebar"
      class="flex flex-row h-screen"
      data-id="sidebar"
    >
      <OrganismSidebarSpaces />
      <OrganismSidebarNavigation @navigate="toggleSidebar" />
    </div>
    <div
      :class="{
        'flex-1 flex flex-col h-screen w-full': true,
        'transition translate-x-5 grayscale brightness-125 dark:brightness-75':
          isSidebarVisible && isAtMostTablet,
      }"
      @click="hideSidebar"
      @keydown.esc="hideSidebar"
    >
      <OrganismHeader
        :is-sidebar-visible="isSidebarVisible"
        @toggle-sidebar="toggleSidebar"
      />
      <main
        :class="{
          'main-width flex-1 bg-base-100 overflow-hidden': true,
          'pointer-events-none touch-none': isSidebarVisible && isAtMostTablet,
        }"
      >
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLayout from 'composables/useLayout'
import useRouting from 'composables/useRouting'
import useSpaceStore from 'stores/useSpaceStore'
import useUserStore from 'stores/useUserStore'

import OrganismHeader from './space/OrganismHeader.vue'
import OrganismSidebarNavigation from './space/OrganismSidebarNavigation.vue'
import OrganismSidebarSpaces from './space/OrganismSidebarSpaces.vue'

const sidebar = $ref<HTMLDivElement | null>(null)
const isAtMostTablet = useLayout().isAtMostTablet
let isSidebarVisible = $ref(!isAtMostTablet.value)
const toggleSidebar = (): void => {
  if (isAtMostTablet.value) isSidebarVisible = !isSidebarVisible
}
const hideSidebar = (): void => {
  if (isSidebarVisible) toggleSidebar()
}
const sidebarWidth = $computed(() => {
  const sidebarWidth = sidebar?.clientWidth ?? 0
  const translateXOnSmallerDevices = isAtMostTablet.value ? 20 : 0
  return isSidebarVisible ? sidebarWidth + translateXOnSmallerDevices : 0
})

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

<style scoped lang="postcss">
.main-width {
  @apply min-w-[360px]; /* the smallest device width */
  width: calc(100vw - v-bind(sidebarWidth) * 1px);
}

main > :first-child:not(.overflow-hidden) {
  @apply overflow-auto;
}

main > :first-child:not(.p-0) {
  @apply p-2 md:p-4;
}
</style>
