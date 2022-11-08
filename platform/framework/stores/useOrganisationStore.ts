import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

import {
  addOrganisation as coreAddOrganisation,
  createRecentSpaces as coreCreateRecentOrganisations,
  getCurrentOrganisation as coreGetCurrentOrganisation,
  getRecentOrganisations as coreGetRecentOrganisations,
  getOrganisation as coreGetOrganisation,
  getOrganisations as coreGetOrganisations,
  Organisation,
  OrganisationId,
  OrganisationMap,
  Organisations,
  RecentSpaces,
  setMostRecentSpace as coreSetMostRecentOrganisation,
  setOrganisation as coreSetOrganisation,
} from 'core/organisation'
import { createUUID } from 'services/browser/uuid'

export const ORGANISATIONS_KEY = 'organisations' as const
export const RECENT_ORGANISATIONS_KEY = 'recentOrganisations' as const

export default defineStore('organisations', {
  state: () => ({
    organisationsMap: useStorage<OrganisationMap>(
      ORGANISATIONS_KEY,
      new Map<OrganisationId, Organisation | null>(),
    ),
    recentOrganisations: useStorage<RecentSpaces>(
      RECENT_ORGANISATIONS_KEY,
      coreCreateRecentOrganisations(),
    ),
  }),
  getters: {
    getOrganisation(state) {
      return (organisationId: string): Organisation | null =>
        coreGetOrganisation(state.organisationsMap, organisationId)
    },
    getCurrentOrganisation(state) {
      return (): Organisation | null =>
        coreGetCurrentOrganisation(
          state.organisationsMap,
          state.recentOrganisations,
        )
    },
    getOrganisations(state) {
      return (): Organisations => coreGetOrganisations(state.organisationsMap)
    },
    getRecentOrganisations(state) {
      return (): Organisations =>
        coreGetRecentOrganisations(
          state.organisationsMap,
          state.recentOrganisations,
        )
    },
  },
  actions: {
    addOrganisation(organisationName: string): Organisation {
      const organisationId = createUUID()
      const { organisation, organisationMap } = coreAddOrganisation(
        this.organisationsMap,
        { id: organisationId, name: organisationName },
      )
      this.organisationsMap = organisationMap
      return organisation
    },
    setOrganisation(organisation: Organisation): void {
      this.organisationsMap = coreSetOrganisation(
        this.organisationsMap,
        organisation,
      )
    },
    setCurrentOrganisationId(currentOrganisationId: string): void {
      this.recentOrganisations = coreSetMostRecentOrganisation(
        this.recentOrganisations,
        currentOrganisationId,
      )
    },
  },
})
