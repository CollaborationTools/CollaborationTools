import { StorageSerializers, useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

import { OrganisationId } from '@/core/organisation'
import {
  AllOrganisationsMembersMap,
  createUser,
  getOrganisationMember as coreGetOrganisationMember,
  getOrganisationMembers as coreGetOrganisationMembers,
  OrganisationMember,
  OrganisationMemberId,
  OrganisationMembers,
  OrganisationMembersMap,
  setOrganisationMember as coreSetOrganisationMember,
  User,
} from '@/core/user'

import { MapOfMapsSerializer } from './MapOfMapsSerializer'

export const USER_PROFILE_KEY = 'me' as const
export const ORGANISATION_MEMBERS_KEY = 'organisationsMembers' as const

export default defineStore('users', {
  state: () => ({
    me: useStorage<User | null>(USER_PROFILE_KEY, null, undefined, {
      serializer: StorageSerializers.object,
    }),
    allOrganisationsMembersMap: useStorage<AllOrganisationsMembersMap>(
      ORGANISATION_MEMBERS_KEY,
      new Map<OrganisationId, OrganisationMembersMap | null>(),
      undefined,
      { serializer: MapOfMapsSerializer },
    ),
  }),
  getters: {
    getMe(state) {
      return (): User | null => (state.me ? readonly(state.me) : null)
    },
    getOrganisationMember(state) {
      return (
        organisationId: OrganisationId,
        organisationMemberId: OrganisationMemberId,
      ): OrganisationMember | null => {
        const organisationMember = coreGetOrganisationMember(
          state.allOrganisationsMembersMap,
          organisationId,
          organisationMemberId,
        )

        return organisationMember ? readonly(organisationMember) : null
      }
    },
    getOrganisationMembers(state) {
      return (organisationId: OrganisationId): OrganisationMembers | null => {
        const organisationMembers = coreGetOrganisationMembers(
          state.allOrganisationsMembersMap,
          organisationId,
        )

        return organisationMembers ? readonly(organisationMembers) : null
      }
    },
  },
  actions: {
    setMe(name: string): User {
      this.me = this.me ? Object.assign(this.me, { name }) : createUser(name)
      return readonly(this.me)
    },
    setOrganisationMember(
      organisationId: OrganisationId,
      organisationMember: OrganisationMember,
    ): void {
      this.allOrganisationsMembersMap = coreSetOrganisationMember(
        this.allOrganisationsMembersMap,
        organisationId,
        organisationMember,
      )
    },
  },
})
