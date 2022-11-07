import { StorageSerializers, useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

import { OrganisationId, Invite, Invites } from 'core/organisation'
import {
  createDevice,
  createUser,
  DeviceId,
  findMember,
  findMemberByDeviceId,
  findMembersBySpaceId,
  OrganisationMember,
  OrganisationMemberId,
  OrganisationMembers,
  MembersInAllSpaces,
  MembersInSpace,
  setMember,
  User,
} from 'core/user'
import { createUUID } from 'services/browser/uuid'

import { MapOfMapsSerializer } from './MapOfMapsSerializer'

export const ORGANISATION_MEMBERS_KEY = 'organisationsMembers' as const
export const USER_PROFILE_KEY = 'me' as const
export const INVITES_KEY = 'invites' as const

export default defineStore('users', {
  state: () => ({
    me: useStorage<User | null>(USER_PROFILE_KEY, null, undefined, {
      serializer: StorageSerializers.object,
    }),
    allOrganisationsMembersMap: useStorage<MembersInAllSpaces>(
      ORGANISATION_MEMBERS_KEY,
      new Map<OrganisationId, MembersInSpace | null>(),
      undefined,
      { serializer: MapOfMapsSerializer },
    ),
    invites: useStorage<Invites>(INVITES_KEY, []),
    isDebug: useStorage<boolean>('isDebug', false),
  }),
  getters: {
    getInvite(state) {
      return (inviteId: string): Invite | null => {
        const invite = state.invites.find((invite) => invite.id === inviteId)
        return invite ? readonly(invite) : null
      }
    },
    getActiveInvites(state) {
      return (): Invites =>
        readonly(
          state.invites.filter(
            (invite) => invite.expiryDate > new Date().toISOString(),
          ),
        )
    },
    getMe(state) {
      return (): User | null => (state.me ? readonly(state.me) : null)
    },
    getIsDebug(state) {
      return (): boolean => state.isDebug
    },
    getOrganisationMember(state) {
      return (
        organisationId: OrganisationId,
        organisationMemberId: OrganisationMemberId,
      ): OrganisationMember | null => {
        const organisationMember = findMember(
          state.allOrganisationsMembersMap,
          organisationId,
          organisationMemberId,
        )

        return organisationMember ? readonly(organisationMember) : null
      }
    },
    getOrganisationMemberByDeviceId(state) {
      return (deviceId: DeviceId): OrganisationMember | null => {
        const organisationMember = findMemberByDeviceId(
          state.allOrganisationsMembersMap,
          deviceId,
        )

        return organisationMember ? readonly(organisationMember) : null
      }
    },
    getOrganisationMembers(state) {
      return (organisationId: OrganisationId): OrganisationMembers | null => {
        const organisationMembers = findMembersBySpaceId(
          state.allOrganisationsMembersMap,
          organisationId,
        )

        return organisationMembers ? readonly(organisationMembers) : null
      }
    },
  },
  actions: {
    setInvite(invite: Invite): void {
      const otherInvites = this.invites.filter(
        (oldInvite) => oldInvite.id !== invite.id,
      )
      this.invites = [...otherInvites, invite]
    },
    setMe(name: string): User {
      if (this.me) {
        this.me = { ...this.me, name }
      } else {
        const newDeviceId = createUUID()
        const newDevice = createDevice(newDeviceId)
        this.me = createUser({
          device: newDevice,
          userId: createUUID(),
          username: name,
        })
      }
      return readonly(this.me)
    },
    setOrganisationMember(
      organisationId: OrganisationId,
      organisationMember: OrganisationMember,
    ): void {
      this.allOrganisationsMembersMap = setMember(
        this.allOrganisationsMembersMap,
        organisationId,
        organisationMember,
      )
    },
  },
})
