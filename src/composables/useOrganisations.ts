import { useStorage } from '@vueuse/core'

import {
  addToOrganisations,
  createOrganisation,
  createRecentOrganisations,
  Organisation,
  OrganisationMap,
  RecentOrganisations,
  setFirstOrganisation,
} from '@/features/organisation'

type UseOrganisation = {
  addOrganisation: (orgName: string) => Readonly<Organisation>
  getActiveOrganisations: () => Readonly<Organisation[]>
  getCurrentOrganisation: () => Readonly<Organisation> | null
  getOrganisation: (organisationId: string) => Readonly<Organisation> | null
  setCurrentOrganisation: (currentOrgId: string) => void
}

export const ORGANISATIONS_KEY = 'organisations' as const
export const RECENT_ORGANISATIONS_KEY = 'recentOrganisations' as const

export default function useOrganisations(): UseOrganisation {
  const organisations = useStorage<OrganisationMap>(
    ORGANISATIONS_KEY,
    new Map<string, Organisation | null>(),
  )

  const recentOrganisations = useStorage<RecentOrganisations>(
    RECENT_ORGANISATIONS_KEY,
    createRecentOrganisations(),
  )

  const getOrganisation = (
    organisationId: string,
  ): Readonly<Organisation> | null => {
    const org = organisations.value.get(organisationId)
    return org ? readonly(org) : null
  }

  const getActiveOrganisations = (): Readonly<Organisation[]> => {
    const allOrganisations = Array.from(organisations.value.values())
    const activeOrganisations = allOrganisations.filter(
      (org): org is Organisation => org !== null,
    )
    return readonly(activeOrganisations)
  }

  const getCurrentOrganisation = (): Readonly<Organisation> | null => {
    const recentOrgId = recentOrganisations.value.at(0)
    if (recentOrgId === undefined) {
      return null
    }
    return getOrganisation(recentOrgId)
  }

  const setCurrentOrganisation = (currentOrgId: string): void => {
    recentOrganisations.value = setFirstOrganisation(
      recentOrganisations.value,
      currentOrgId,
    )
  }

  const addOrganisation = (orgName: string): Readonly<Organisation> => {
    const org = createOrganisation(orgName)
    organisations.value = addToOrganisations(organisations.value, org)
    return readonly(org)
  }

  return {
    addOrganisation,
    getActiveOrganisations,
    getOrganisation,
    getCurrentOrganisation,
    setCurrentOrganisation,
  }
}
