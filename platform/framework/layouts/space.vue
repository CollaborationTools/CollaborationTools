<template>
  <div class="flex flex-col min-h-screen">
    <OrganismHeader />
    <main class="block p-4 md:p-8 pb-20 w-full">
      <slot />
    </main>
    <OrganismFooter />
  </div>
</template>

<script setup lang="ts">
import useSpaceStore from '@/stores/useSpaceStore'
import useUserStore from '@/stores/useUserStore'

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
