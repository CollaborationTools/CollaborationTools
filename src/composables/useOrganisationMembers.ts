import { OrganisationId } from '@/core/organisation'
import {
  createOrganisationMember,
  OrganisationMemberId,
  OrganisationMemberRole,
} from '@/core/user'
import useUserStore from '@/stores/useUserStore'

type AddNewOrganisationMemberProps = {
  devices: string[] | undefined
  id: OrganisationMemberId | undefined
  name: string | undefined
  organisationId: OrganisationId | undefined
  role?: OrganisationMemberRole
}

type UseOrganisationMembers = {
  addNewOrganisationMember: (props: AddNewOrganisationMemberProps) => void
}

export default function useOrganisationMembers(): UseOrganisationMembers {
  const userStore = useUserStore()

  const addNewOrganisationMember = ({
    devices,
    id,
    name,
    organisationId,
    role,
  }: AddNewOrganisationMemberProps): void => {
    if (!devices || !id || !name || !organisationId) {
      return
    }
    const organisationMember = createOrganisationMember({
      id,
      devices,
      name,
      role,
    })
    userStore.setOrganisationMember(organisationId, organisationMember)
  }

  return { addNewOrganisationMember }
}
