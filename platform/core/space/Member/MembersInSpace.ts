import { DeviceId } from 'core/user'

import { Member, MemberId, Members } from './Member'

import { SpaceId } from '../Space'

export type MembersInSpace = ReadonlyMap<MemberId, Member>
export type MembersInAllSpaces = ReadonlyMap<SpaceId, MembersInSpace | null>

export const findMember = (
  membersInAllSpaces: MembersInAllSpaces,
  spaceId: SpaceId,
  memberId: MemberId,
): Member | null => {
  const membersInSpace = membersInAllSpaces.get(spaceId)

  if (!membersInSpace) return null

  return membersInSpace.get(memberId) ?? null
}

export const findMemberByDeviceId = (
  membersInAllSpaces: MembersInAllSpaces,
  deviceId: DeviceId,
): Member | null => {
  let result: Member | null = null
  membersInAllSpaces.forEach((space) => {
    if (!space) {
      return
    }
    space.forEach((member) => {
      if (member && member.devices.includes(deviceId)) {
        result = member
      }
    })
  })

  return result
}

export const findMembersBySpaceId = (
  membersInAllSpaces: MembersInAllSpaces,
  spaceId: SpaceId,
): Members | null => {
  const membersInSpace = membersInAllSpaces.get(spaceId)
  if (!membersInSpace) {
    return null
  } else {
    return Array.from(membersInSpace.values())
  }
}

export const setMember = (
  membersInAllSpaces: MembersInAllSpaces,
  spaceId: SpaceId,
  member: Member,
): MembersInAllSpaces => {
  const membersInSpace = new Map(membersInAllSpaces.get(spaceId))

  membersInSpace.set(member.id, member)

  return new Map(membersInAllSpaces).set(spaceId, membersInSpace)
}

export const updateMembersInSpace = (
  membersInAllSpaces: MembersInAllSpaces,
  spaceId: SpaceId,
  membersInSpace: MembersInSpace,
): MembersInAllSpaces => {
  return new Map(membersInAllSpaces).set(spaceId, membersInSpace)
}

export const deleteMembersInSpace = (
  membersInAllSpaces: MembersInAllSpaces,
  spaceId: SpaceId,
): MembersInAllSpaces => {
  return new Map(membersInAllSpaces).set(spaceId, null)
}
