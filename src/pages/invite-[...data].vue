<template>
  <main
    v-if="state === 'invite'"
    class="grid grid-col gap-4 prose prose-sm md:prose-base"
  >
    <h1 class="text-center !mt-0 dark:text-white">Welcome to</h1>
    <AtomLogo with-header />

    <h2 class="!mt-2">
      You are invited to join
      <span data-id="org-name">{{
        maybeInviteData?.organisationName?.replace(' ', '&nbsp;')
      }}</span
      ><AtomDot />
    </h2>
    <template v-if="!me">
      <OrganismCreateProfile @update="createUser" />
    </template>
    <template v-if="me">
      <AtomButton primary @click="acceptInvite">Join</AtomButton>
    </template>
  </main>
  <main
    v-else-if="state === 'loading'"
    class="grid grid-col prose prose-sm md:prose-base"
  >
    <p class="text-center">loading...</p>
    <progress class="progress w-40"></progress>
  </main>
  <OrganismError
    v-else-if="state === 'error'"
    :error="isInviteLinkExpired ? '408' : '400'"
    :error-message="
      isInviteLinkExpired
        ? 'Your invite link has expired'
        : 'Your invite link is not correct'
    "
    recommended-action="Ask for a new link to try again."
  />
</template>

<script setup lang="ts">
import { Ref } from 'vue'

import useInvitations from '@/composables/useInvitations'
import { InviteLinkData, parseInviteLinkData } from '@/core/user'
import useUserStore from '@/stores/useUserStore'

const userStore = useUserStore()
const route = useRoute()

const me = $computed(() => userStore.getMe())
const displayName: Ref<string | undefined> = ref(undefined)
const maybeInviteData: Ref<InviteLinkData | null> = ref(null)
const state: Ref<'error' | 'invite' | 'loading'> = ref('invite')
const isInviteLinkExpired = ref(false)

const maybeEncodedInviteData = computed(() =>
  route.params.data instanceof Array
    ? route.params.data.join('/')
    : route.params.data,
)

watchEffect(() => {
  if (!maybeEncodedInviteData.value) {
    state.value = 'error'
    return
  }

  maybeInviteData.value = parseInviteLinkData(maybeEncodedInviteData.value)

  if (maybeInviteData.value === null) {
    state.value = 'error'
  }

  if (
    maybeInviteData.value?.expiryDate &&
    maybeInviteData.value.expiryDate < new Date().toISOString()
  ) {
    state.value = 'error'
    isInviteLinkExpired.value = true
  }
})

const createUser = (userName: string, newDisplayName?: string): void => {
  displayName.value = newDisplayName
  userStore.setMe(userName)

  useInvitations().connectToInviter(maybeInviteData.value?.inviterId)
}

const acceptInvite = (): void => {
  if (!maybeInviteData.value || !me) {
    return
  }

  useInvitations().acceptInvite({
    inviterId: maybeInviteData.value.inviterId,
    invitationId: maybeInviteData.value.invitationId,
    userName: displayName.value ?? me.name,
  })

  state.value = 'loading'
}

useHead({
  title: maybeInviteData.value?.organisationName
    ? 'Joining ' + maybeInviteData.value.organisationName
    : isInviteLinkExpired.value
    ? 'Invite link has expired'
    : 'Wrong invite link',
})

definePageMeta({
  layout: 'center',
})
</script>
