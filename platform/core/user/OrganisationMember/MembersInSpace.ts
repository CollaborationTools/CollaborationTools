import { OrganisationId } from 'core/organisation'
import { DeviceId } from 'core/user'

import {
  OrganisationMember,
  OrganisationMemberId,
  OrganisationMembers,
} from './OrganisationMember'

export type MembersInSpace = ReadonlyMap<
  OrganisationMemberId,
  OrganisationMember
>
export type MembersInAllSpaces = ReadonlyMap<
  OrganisationId,
  MembersInSpace | null
>

export const findMember = (
  membersInAllSpaces: MembersInAllSpaces,
  spaceId: OrganisationId,
  memberId: OrganisationMemberId,
): OrganisationMember | null => {
  const membersInSpace = membersInAllSpaces.get(spaceId)

  if (!membersInSpace) return null

  return membersInSpace.get(memberId) ?? null
}

export const findMemberByDeviceId = (
  membersInAllSpaces: MembersInAllSpaces,
  deviceId: DeviceId,
): OrganisationMember | null => {
  let result: OrganisationMember | null = null
  membersInAllSpaces.forEach((space) => {
    if (!space) {
      return
    }
    space.forEach((organisationMember) => {
      if (organisationMember && organisationMember.devices.includes(deviceId)) {
        result = organisationMember
      }
    })
  })

  return result
}

export const findMembersBySpaceId = (
  membersInAllSpaces: MembersInAllSpaces,
  spaceId: OrganisationId,
): OrganisationMembers | null => {
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
  member: OrganisationMember,
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
