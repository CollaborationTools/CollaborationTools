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
import useOrganisationStore from '@/stores/useOrganisationStore'
import useUserStore from '@/stores/useUserStore'

const router = useRouter()
const maybeOrgId = $computed(() =>
  router.currentRoute.value.params.id instanceof Array
    ? router.currentRoute.value.params.id[0]
    : router.currentRoute.value.params.id,
)

const organisationStore = useOrganisationStore()
const org = computed(() =>
  maybeOrgId ? organisationStore.getOrganisation(maybeOrgId) : null,
)

const userStore = useUserStore()
const me = userStore.getMe()

if (me && org.value) {
  const members = userStore.getMembers(org.value.id)
  useConnectionHub().runConnectionHub(me.currentDevice, members ?? [])
}

watch(
  // eslint-disable-next-line total-functions/no-unsafe-readonly-mutable-assignment
  org,
  () => {
    if (org.value === null) {
      if (!router.currentRoute.value.fullPath.includes('/new')) {
        throwError('Organisation was not found')
        return undefined
      }
    } else {
      organisationStore.setCurrentOrganisationId(org.value.id)
      const members = userStore.getMembers(org.value.id)
      useConnectionHub().setMembers(members ?? [])
    }
  },
  { immediate: true },
)
</script>
