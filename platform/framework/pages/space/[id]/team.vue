<template>
  <div class="grid grid-cols-1 gap-4 w-full md:max-w-3xl mx-auto mb-16">
    <template v-if="me">
      <template v-if="isMember">
        <OrganismInvites :invites="invites" />
        <OrganismMemberList :members="members ?? []" />
      </template>
      <template v-else>
        <AtomInfoBox>
          You have your profile configured but you are not an active member of
          <strong>{{ currentSpace?.name ?? 'current space' }}</strong>
          yet.
        </AtomInfoBox>
        <AtomButton
          primary
          outline
          data-id="join-now"
          @click="joinOwnSpace(undefined)"
          >Join as {{ me.name }}</AtomButton
        >
        <OrganismSetName @update="joinOwnSpace" />
      </template>
    </template>
    <template v-else>
      <AtomInfoBox>
        You have your profile configured&nbsp;yet. Create it now so you will
        be&nbsp;able to&nbsp;invite others to&nbsp;join this&nbsp;space.
      </AtomInfoBox>
      <OrganismCreateProfile @update="createUser" />
    </template>
  </div>
</template>

<script setup lang="ts">
import useSpaceStore from '@/stores/useSpaceStore'
import useUserStore from '@/stores/useUserStore'

const spaceStore = useSpaceStore()
const userStore = useUserStore()

const currentSpace = spaceStore.getCurrentSpace()

useHead({
  title: `Team @ ${currentSpace?.name}`,
})

definePageMeta({
  layout: 'space',
})

const invites = $computed(() => userStore.getActiveInvites())
const me = $computed(() => userStore.getMe())
const members = $computed(() => userStore.getMembers(currentSpace?.id ?? ''))
const isMember = $computed(
  () => !!members?.find((member) => member.id === me?.id),
)

const joinOwnSpace = (displayName?: string): void => {
  useMembers().addNewMember({
    devices: me?.devices.map((device) => device.id),
    id: me?.id,
    name: displayName ?? me?.name,
    spaceId: currentSpace?.id,
    role: 'admin',
  })
}

const createUser = (name: string, displayName?: string): void => {
  userStore.setMe(name)
  joinOwnSpace(displayName)
}
</script>
