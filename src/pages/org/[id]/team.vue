<template>
  <div class="grid grid-cols-1 gap-4 w-full md:max-w-3xl mx-auto">
    <template v-if="me">
      <template v-if="isOrganisationMember">
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
          @click="joinOrganisation(undefined)"
          >Join as {{ me.name }}</AtomButton
        >
        <OrganismSetName @update="joinOrganisation" />
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
import useOrganisationStore from '@/stores/useOrganisationStore'
import useUserStore from '@/stores/useUserStore'

const organisationStore = useOrganisationStore()
const userStore = useUserStore()

const currentOrganisation = organisationStore.getCurrentOrganisation()
const { addNewOrganisationMember } = useOrganisationMembers()

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

const joinOrganisation = (displayName?: string): void => {
  addNewOrganisationMember(me, currentOrganisation?.id, {
    role: 'admin',
    displayName,
  })
}
</script>
