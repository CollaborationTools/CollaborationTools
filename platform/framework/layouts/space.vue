<template>
  <div class="flex flex-row overflow-x-hidden">
    <div
      v-if="isSidebarVisible"
      class="flex flex-row h-screen"
      data-id="sidebar"
    >
      <OrganismSidebarSpaces />
      <OrganismSidebarNavigation />
    </div>
    <div class="flex-1 flex flex-col min-h-screen">
      <OrganismHeader
        :is-sidebar-visible="isSidebarVisible"
        @toggle-sidebar="toggleSidebar"
      />
      <main class="p-4 md:p-8 pb-20 w-full">
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
const toggleSidebar = (): boolean =>
  (isSidebarVisible.value = !isSidebarVisible.value)

const router = useRouter()
const maybeSpaceId = $computed(() =>
  router.currentRoute.value.params.id instanceof Array
    ? router.currentRoute.value.params.id[0]
    : router.currentRoute.value.params.id,
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
      if (!router.currentRoute.value.fullPath.includes('/new')) {
        throwError('Space was not found')
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
