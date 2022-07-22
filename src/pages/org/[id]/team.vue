<template>
  <div v-if="me" class="grid grid-cols-1 gap-4">
    <OrganismMemberList :members="organisationMembers" />
  </div>
  <div v-else class="grid grid-cols-1 gap-4 w-full md:max-w-3xl mx-auto">
    <AtomInfoBox>
      You do not have your profile configured&nbsp;yet. Create it now so you
      will be&nbsp;able to&nbsp;invite others to&nbsp;join
      this&nbsp;organisation.
    </AtomInfoBox>
    <OrganismCreateUser />
  </div>
</template>

<script setup lang="ts">
import useOrganisations from '@/stores/useOrganisations'
import useUsers from '@/stores/useUsers'

const organisationStore = useOrganisations()
const userStore = useUsers()

const currentOrganisation = organisationStore.getCurrentOrganisation()

useHead({
  title: `Team @ ${currentOrganisation?.name}`,
})

definePageMeta({
  layout: 'org',
})

const me = computed(() => userStore.getMe())
const organisationMembers = computed(() =>
  userStore.getOrganisationMembers(currentOrganisation?.id ?? ''),
)
</script>
