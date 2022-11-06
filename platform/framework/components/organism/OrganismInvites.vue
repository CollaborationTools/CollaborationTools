<template>
  <div
    class="grid gap-4 prose prose-sm md:prose-base mx-auto mb-8 text-center"
    data-id="invites"
  >
    <h2 class="text-center">Invites</h2>
    <MoleculeModal
      v-model="isModalOpen"
      outline
      label="Invite new member"
      confirm-label="Copy invite link"
      data-id="invite-new-member"
      @confirm="createInvite"
    >
      <h3 class="font-bold text-lg text-center">
        Invite new member<AtomDot />
      </h3>
      <AtomInfoBox>
        To process an invite you and your invited member have to be both online.
        There are
        {{ INVITE_EXPIRY_TIME_IN_MINUTES }} minutes to finish the process. Share
        the link with the invitee and wait for the confirmation.
      </AtomInfoBox>
    </MoleculeModal>
    <p v-if="invites.length === 0">There are no invites</p>
    <p v-if="invites.length > 0">
      There
      {{
        invites.length === 1
          ? 'is 1 active invite'
          : `are ${invites.length} active invites`
      }}<AtomDot />
    </p>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

import useOrganisationStore from '@/stores/useOrganisationStore'
import { INVITE_EXPIRY_TIME_IN_MINUTES, Invites } from 'core/organisation'

type Props = {
  invites: Invites
}

const { invites } = defineProps<Props>()

const organisation = useOrganisationStore().getCurrentOrganisation()

const isModalOpen = ref(false)

const createInvite = (): void => {
  const invite = useInvites().createInvite()

  if (!invite) {
    return
  }

  useClipboard().copy(invite.inviteLink)

  isModalOpen.value = false
}
</script>
