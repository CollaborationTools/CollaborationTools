import { useStorage } from '@vueuse/core'

import { createOrganisation, Organisation } from '@/features/organisation'

type UseOrganisation = {
  getOrganisation: () => Readonly<Organisation>
  addOrganisation: (orgName: string) => Readonly<Organisation>
  openOrganisationPage: (orgId: string) => void
}

export function useOrganisation(): UseOrganisation {
  const org = useStorage('organisation', { id: '', name: '' })

  const getOrganisation = (): Readonly<Organisation> => readonly(org.value)

  const addOrganisation = (orgName: string): Readonly<Organisation> => {
    org.value = createOrganisation(orgName)
    return readonly(org.value)
  }

  const openOrganisationPage = (orgId: string): void => {
    const router = useRouter()
    router.push('/org/' + orgId)
  }

  return { getOrganisation, addOrganisation, openOrganisationPage }
}
