<template>
  <div
    class="grid gap-4 prose prose-sm md:prose-base mx-auto mb-8 text-center"
    data-id="invitations"
  >
    <h2 class="text-center">Invitations</h2>
    <MoleculeModal
      v-model="isModalOpen"
      outline
      label="Invite new member"
      confirm-label="Copy invitation link"
      data-id="invite-new-member"
      @confirm="createNewInvitation"
    >
      <h3 class="font-bold text-lg text-center">
        Invite new member<AtomDot />
      </h3>
      <AtomInfoBox>
        To process an invite you and your invited member have to be both online.
        There are
        {{ INVITATION_EXPIRY_TIME_IN_MINUTES }} minutes to finish the process.
        Share the link with the invitee and wait for the confirmation.
      </AtomInfoBox>
    </MoleculeModal>
    <p v-if="invitations.length === 0">There are no invitations</p>
    <p v-if="invitations.length > 0">
      There
      {{
        invitations.length === 1
          ? 'is 1 invitation'
          : `are ${invitations.length} invitations`
      }}<AtomDot />
    </p>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'


import useOrganisationStore from '@/stores/useOrganisationStore'
import useUserStore from '@/stores/useUserStore'
import {
  createInvitation,
  INVITATION_EXPIRY_TIME_IN_MINUTES,
  Invitations,
} from 'core/organisation'

type Props = {
  invitations: Invitations
}

const { invitations } = defineProps<Props>()

const userStore = useUserStore()

const inviterId = userStore.getMe()?.currentDevice
const organisation = useOrganisationStore().getCurrentOrganisation()

const isModalOpen = ref(false)

const createNewInvitation = (): void => {
  if (!inviterId || !organisation) {
    return
  }

  const invitation = createInvitation({
    inviterId,
    organisationName: organisation.name,
    organisationId: organisation.id,
  })

  userStore.setInvitation(invitation)
  useClipboard().copy(invitation.inviteLink)

  isModalOpen.value = false
}
</script>
