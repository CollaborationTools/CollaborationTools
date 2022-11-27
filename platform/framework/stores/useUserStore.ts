import { StorageSerializers, useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

import {
  findMember,
  findMemberByDeviceId,
  findMembersBySpaceId,
  Invite,
  Invites,
  Member,
  MemberId,
  Members,
  MembersInAllSpaces,
  MembersInSpace,
  setMember,
  SpaceId,
} from 'core/space'
import { createDevice, createUser, DeviceId, User } from 'core/user'
import { createUUID } from 'services/crypto/uuid'

import { MapOfMapsSerializer } from './MapOfMapsSerializer'

export const MEMBERS_KEY = 'members' as const
export const USER_PROFILE_KEY = 'me' as const
export const INVITES_KEY = 'invites' as const

export default defineStore('users', {
  state: () => ({
    me: useStorage<User | null>(USER_PROFILE_KEY, null, undefined, {
      serializer: StorageSerializers.object,
    }),
    membersInAllSpaces: useStorage<MembersInAllSpaces>(
      MEMBERS_KEY,
      new Map<SpaceId, MembersInSpace | null>(),
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
    getMember(state) {
      return (spaceId: SpaceId, memberId: MemberId): Member | null => {
        const member = findMember(state.membersInAllSpaces, spaceId, memberId)

        return member ? readonly(member) : null
      }
    },
    getMemberByDeviceId(state) {
      return (deviceId: DeviceId): Member | null => {
        const member = findMemberByDeviceId(state.membersInAllSpaces, deviceId)

        return member ? readonly(member) : null
      }
    },
    getMembers(state) {
      return (
        spaceId: SpaceId,
        options?: { excludeSelf: boolean },
      ): Members | null => {
        const { excludeSelf = false } = options ?? { excludeSelf: false }
        let members = findMembersBySpaceId(state.membersInAllSpaces, spaceId)

        if (excludeSelf && members) {
          members = members.filter((member) => member.id !== state.me?.id)
        }

        return members ? readonly(members) : null
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
    setMember(spaceId: SpaceId, member: Member): void {
      this.membersInAllSpaces = setMember(
        this.membersInAllSpaces,
        spaceId,
        member,
      )
    },
  },
})
