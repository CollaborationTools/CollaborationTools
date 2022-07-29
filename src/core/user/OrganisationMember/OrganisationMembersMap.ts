import { OrganisationId } from '@/core/organisation'

import {
  OrganisationMember,
  OrganisationMemberId,
  OrganisationMembers,
} from './OrganisationMember'

export type OrganisationMembersMap = ReadonlyMap<
  OrganisationMemberId,
  OrganisationMember
>
export type AllOrganisationsMembersMap = ReadonlyMap<
  OrganisationId,
  OrganisationMembersMap | null
>

export const getOrganisationMember = (
  allOrganisationsMembersMap: AllOrganisationsMembersMap,
  organisationId: OrganisationId,
  organisationMemberId: OrganisationMemberId,
): OrganisationMember | null => {
  const organisationMembersMap = allOrganisationsMembersMap.get(organisationId)

  if (!organisationMembersMap) return null

  return organisationMembersMap.get(organisationMemberId) ?? null
}

export const getOrganisationMembers = (
  allOrganisationsMembersMap: AllOrganisationsMembersMap,
  organisationId: OrganisationId,
): OrganisationMembers | null => {
  const organisationMembersMap = allOrganisationsMembersMap.get(organisationId)
  if (!organisationMembersMap) {
    return null
  } else {
    return Array.from(organisationMembersMap.values())
  }
}

export const setOrganisationMember = (
  allOrganisationsMembersMap: AllOrganisationsMembersMap,
  organisationId: OrganisationId,
  organisationMember: OrganisationMember,
): AllOrganisationsMembersMap => {
  const organisationMembers = new Map(
    allOrganisationsMembersMap.get(organisationId),
  )
  organisationMembers.set(organisationMember.id, organisationMember)

  return new Map(allOrganisationsMembersMap).set(
    organisationId,
    organisationMembers,
  )
}

export const setOrganisationMembersMap = (
  allOrganisationsMembersMap: AllOrganisationsMembersMap,
  organisationId: OrganisationId,
  organisationMembersMap: OrganisationMembersMap,
): AllOrganisationsMembersMap => {
  return new Map(allOrganisationsMembersMap).set(
    organisationId,
    organisationMembersMap,
  )
}

export const deleteOrganisationMembers = (
  allOrganisationsMembersMap: AllOrganisationsMembersMap,
  organisationId: OrganisationId,
): AllOrganisationsMembersMap => {
  return new Map(allOrganisationsMembersMap).set(organisationId, null)
}
