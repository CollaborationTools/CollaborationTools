import { createInvitation, Invitation } from '@/core/user'
import useOrganisationStore from '@/stores/useOrganisationStore'
import useUserStore from '@/stores/useUserStore'

type UseInvitations = {
  createInvite: () => Invitation | null
}

export default function useInvitations(): UseInvitations {
  const userStore = useUserStore()
  const organisationStore = useOrganisationStore()

  const createInvite = (): Invitation | null => {
    const inviterId = userStore.getMe()?.id
    const currentOrganisation = organisationStore.getCurrentOrganisation()

    if (!inviterId || !currentOrganisation) {
      return null
    }

    const organisationId = currentOrganisation.id
    const organisationName = currentOrganisation.name

    const invitation = createInvitation({
      inviterId,
      organisationId,
      organisationName,
    })
    userStore.setInvitation(invitation)
    return invitation
  }

  return {
    createInvite,
  }
}
