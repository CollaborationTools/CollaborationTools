import { OrganisationId } from 'core/organisation'
import { DeviceId } from 'core/user'

import { Member, MemberId, Members } from './Member'

export type MembersInSpace = ReadonlyMap<MemberId, Member>
export type MembersInAllSpaces = ReadonlyMap<
  OrganisationId,
  MembersInSpace | null
>

export const findMember = (
  membersInAllSpaces: MembersInAllSpaces,
  spaceId: OrganisationId,
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
  spaceId: OrganisationId,
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
  spaceId: OrganisationId,
  member: Member,
): MembersInAllSpaces => {
  const membersInSpace = new Map(membersInAllSpaces.get(spaceId))

  membersInSpace.set(member.id, member)

  return new Map(membersInAllSpaces).set(spaceId, membersInSpace)
}

export const updateMembersInSpace = (
  membersInAllSpaces: MembersInAllSpaces,
  spaceId: OrganisationId,
  membersInSpace: MembersInSpace,
): MembersInAllSpaces => {
  return new Map(membersInAllSpaces).set(spaceId, membersInSpace)
}

export const deleteMembersInSpace = (
  membersInAllSpaces: MembersInAllSpaces,
  spaceId: OrganisationId,
): MembersInAllSpaces => {
  return new Map(membersInAllSpaces).set(spaceId, null)
}
