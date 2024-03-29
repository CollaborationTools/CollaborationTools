<template>
  <main
    v-if="state === 'invite'"
    class="grid grid-col gap-4 prose prose-sm md:prose-base"
  >
    <h1 class="text-center !mt-0 dark:text-white">Welcome to</h1>
    <AtomLogo with-header />

    <h2 class="!mt-2">
      You are invited to join
      <span data-id="space-name">{{
        maybeInviteLinkData?.spaceName?.replace(' ', '&nbsp;')
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

import useRouting from 'composables/useRouting'
import { InviteLinkData, parseInviteLinkData } from 'core/space'
import { decode } from 'services/crypto/encoder'
import useSpaceStore from 'stores/useSpaceStore'
import useUserStore from 'stores/useUserStore'

const userStore = useUserStore()
const route = useRoute()

const me = $computed(() => userStore.getMe())
const displayName: Ref<string | undefined> = ref(undefined)
const maybeInviteLinkData: Ref<InviteLinkData | null> = ref(null)
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

  maybeInviteLinkData.value = parseInviteLinkData(
    decode(maybeEncodedInviteData.value),
  )

  if (maybeInviteLinkData.value === null) {
    state.value = 'error'
    return
  }

  if (maybeInviteLinkData.value.expiryDate < new Date().toISOString()) {
    state.value = 'error'
    isInviteLinkExpired.value = true
  }

  if (me) {
    useInvites().connectToInviter(maybeInviteLinkData.value.inviterId)
  }
})

const createUser = (userName: string, newDisplayName?: string): void => {
  displayName.value = newDisplayName
  userStore.setMe(userName)
}

const acceptInvite = (): void => {
  if (!maybeInviteLinkData.value || !me) {
    return
  }

  useInvites().acceptInvite({
    inviterId: maybeInviteLinkData.value.inviterId,
    inviteId: maybeInviteLinkData.value.inviteId,
    userName: displayName.value ?? me.name,
  })

  state.value = 'loading'
}

watchEffect(() => {
  const space = useSpaceStore().getSpace(
    maybeInviteLinkData.value?.spaceId ?? '',
  )
  if (!space) {
    return
  }

  useRouting().openSpace(space.id)
})

useHead({
  title: maybeInviteLinkData.value?.spaceName
    ? 'Joining ' + maybeInviteLinkData.value.spaceName
    : isInviteLinkExpired.value
    ? 'Invite link has expired'
    : 'Wrong invite link',
})

definePageMeta({
  layout: 'center',
})
</script>
