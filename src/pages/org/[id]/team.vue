<template>
  <div class="grid grid-cols-1 gap-4 w-full md:max-w-3xl mx-auto">
    <template v-if="me">
      <template v-if="isOrganisationMember">
        <OrganismInvitations :invitations="invitations" />
        <OrganismMemberList :members="organisationMembers ?? []" />
      </template>
      <template v-else>
        <AtomInfoBox>
          You have your profile configured but you are not an active member of
          <strong>{{
            currentOrganisation?.name ?? 'current organisation'
          }}</strong>
          yet.
        </AtomInfoBox>
        <AtomButton
          primary
          outline
          data-id="join-now"
          @click="joinOwnOrganisation(undefined)"
          >Join as {{ me.name }}</AtomButton
        >
        <OrganismSetName @update="joinOwnOrganisation" />
      </template>
    </template>
    <template v-else>
      <AtomInfoBox>
        You have your profile configured&nbsp;yet. Create it now so you will
        be&nbsp;able to&nbsp;invite others to&nbsp;join this&nbsp;organisation.
      </AtomInfoBox>
      <OrganismCreateProfile @update="createUser" />
    </template>
  </div>
</template>

<script setup lang="ts">
import useOrganisationStore from '@/stores/useOrganisationStore'
import useUserStore from '@/stores/useUserStore'

const organisationStore = useOrganisationStore()
const userStore = useUserStore()

const currentOrganisation = organisationStore.getCurrentOrganisation()

useHead({
  title: `Team @ ${currentOrganisation?.name}`,
})

definePageMeta({
  layout: 'org',
})

const { addNewOrganisationMember } = useOrganisationMembers()
const invitations = $computed(() => userStore.getActiveInvitations())
const me = $computed(() => userStore.getMe())
const organisationMembers = $computed(() =>
  userStore.getOrganisationMembers(currentOrganisation?.id ?? ''),
)
const isOrganisationMember = $computed(
  () => !!organisationMembers?.find((member) => member.id === me?.id),
)

const joinOwnOrganisation = (displayName?: string): void => {
  addNewOrganisationMember({
    devices: me?.devices.map((device) => device.id),
    id: me?.id,
    name: displayName ?? me?.name,
    organisationId: currentOrganisation?.id,
    role: 'admin',
  })
}

const createUser = (name: string, displayName?: string): void => {
  userStore.setMe(name)
  joinOwnOrganisation(displayName)
}
</script>
