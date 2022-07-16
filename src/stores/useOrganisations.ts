import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

import {
  setOrganisation,
  createOrganisation,
  createRecentOrganisations,
  Organisation,
  OrganisationId,
  OrganisationMap,
  RecentOrganisations,
  setMostRecentOrganisation,
} from '@/features/organisation'

export const ORGANISATIONS_KEY = 'organisations' as const
export const RECENT_ORGANISATIONS_KEY = 'recentOrganisations' as const

export default defineStore('organisations', {
  state: () => ({
    organisations: useStorage<OrganisationMap>(
      ORGANISATIONS_KEY,
      new Map<OrganisationId, Organisation | null>(),
    ),
    recentOrganisations: useStorage<RecentOrganisations>(
      RECENT_ORGANISATIONS_KEY,
      createRecentOrganisations(),
    ),
  }),
  getters: {
    getOrganisation(state) {
      return (organisationId: string): Readonly<Organisation> | null => {
        const organisation = state.organisations.get(organisationId)
        return organisation ? readonly(organisation) : null
      }
    },
    getCurrentOrganisation(state) {
      return (): Readonly<Organisation> | null => {
        const recentOrganisationId = state.recentOrganisations.at(0)
        if (recentOrganisationId === undefined) {
          return null
        }
        return this.getOrganisation(recentOrganisationId)
      }
    },
    getOrganisations(state) {
      return (): Readonly<Organisation[]> => {
        const organisations = Array.from(state.organisations.values())
        const existingOrganisations = organisations.filter(
          (organisation): organisation is Organisation => organisation !== null,
        )
        return readonly(existingOrganisations)
      }
    },
    getRecentOrganisations(state) {
      return (): Readonly<Organisation[]> => {
        const recentOrganisations = state.recentOrganisations.map(
          (organisationId) => state.organisations.get(organisationId ?? ''),
        )
        const existingOrganisations = recentOrganisations.filter(
          (organisation): organisation is Organisation =>
            organisation !== null && organisation !== undefined,
        )
        return readonly(existingOrganisations)
      }
    },
  },
  actions: {
    addOrganisation(organisationName: string): Readonly<Organisation> {
      const organisation = createOrganisation(organisationName)
      this.organisations = setOrganisation(this.organisations, organisation)
      return readonly(organisation)
    },
    setCurrentOrganisationId(currentOrganisationId: string): void {
      this.recentOrganisations = setMostRecentOrganisation(
        this.recentOrganisations,
        currentOrganisationId,
      )
    },
  },
})
