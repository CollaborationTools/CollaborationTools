<template>
  <div class="grid grid-cols-1 gap-4 w-full md:max-w-3xl mx-auto">
    <template v-if="me">
      <template v-if="isOrganisationMember">
        <OrganismMemberList :members="organisationMembers" />
      </template>
      <template v-else>
        <AtomInfoBox>
          You have your profile configured but you are not an active member of
          <strong>{{ currentOrganisation.name }}</strong> yet.
        </AtomInfoBox>
        <AtomButton primary outline data-id="join-now" @click="joinNow"
          >Join as {{ me.name }}</AtomButton
        >
        <OrganismSetName @update="setDisplayName" />
      </template>
    </template>
    <template v-else>
      <AtomInfoBox>
        You have your profile configured&nbsp;yet. Create it now so you will
        be&nbsp;able to&nbsp;invite others to&nbsp;join this&nbsp;organisation.
      </AtomInfoBox>
      <OrganismCreateUser />
    </template>
  </div>
</template>

<script setup lang="ts">
import AtomButton from '@/components/atom/AtomButton.vue'
import OrganismSetName from '@/components/organism/OrganismSetName.vue'
import { createOrganisationMember } from '@/core/user'
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

const me = $computed(() => userStore.getMe())
const organisationMembers = $computed(() =>
  userStore.getOrganisationMembers(currentOrganisation?.id ?? ''),
)
const isOrganisationMember = $computed(
  () => !!organisationMembers?.find((member) => member.id === me?.id),
)

const joinNow = (): void => {
  if (!me || !currentOrganisation?.id) return
  const organisationMember = createOrganisationMember(me, 'admin')
  userStore.setOrganisationMember(currentOrganisation.id, organisationMember)
}

const setDisplayName = (displayName: string): void => {
  if (!me || !currentOrganisation?.id) return
  const organisationMember = createOrganisationMember(me, 'admin', displayName)
  userStore.setOrganisationMember(currentOrganisation.id, organisationMember)
}
</script>
