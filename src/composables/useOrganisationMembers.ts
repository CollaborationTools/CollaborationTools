import { OrganisationId } from '@/core/organisation'
import {
  createOrganisationMember,
  OrganisationMemberRole,
  User,
} from '@/core/user'
import useUserStore from '@/stores/useUserStore'

type UseOrganisationMembers = {
  addNewOrganisationMember: (
    user: User | null,
    organisationId: OrganisationId | undefined,
    options: { role?: OrganisationMemberRole; displayName?: string },
  ) => void
}

export default function useOrganisationMembers(): UseOrganisationMembers {
  const userStore = useUserStore()

  const addNewOrganisationMember = (
    user: User | null,
    organisationId: OrganisationId | undefined,
    {
      role,
      displayName,
    }: { role?: OrganisationMemberRole; displayName?: string },
  ): void => {
    if (!user || !organisationId) return
    const organisationMember = createOrganisationMember(user, role, displayName)
    userStore.setOrganisationMember(organisationId, organisationMember)
  }

  return { addNewOrganisationMember }
}
