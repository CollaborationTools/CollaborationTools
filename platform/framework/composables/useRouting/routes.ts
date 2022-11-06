import type { InviteLink } from 'core/organisation'

const INVITE_LINK_ENCODED_DATA = ':data' as const

export const visitorRoutes = {
  getStarted: 'get-started',
  guide: 'guide',
  guideJoinOrg: '/guide/joining-organisation',
  invite: `/invite-${INVITE_LINK_ENCODED_DATA}`,
  tools: 'tools',
} as const

export const createInviteLink = (encodedData: string): InviteLink =>
  location.origin +
  visitorRoutes.invite.replace(INVITE_LINK_ENCODED_DATA, encodedData)

export const ORG_PATH = '/org' as const
export const ORG_ID_PARAM = ':id' as const

export const organisationRoutes = {
  all: `${ORG_PATH}`,
  new: `${ORG_PATH}/new`,
  index: `${ORG_PATH}/${ORG_ID_PARAM}`,
  team: `${ORG_PATH}/${ORG_ID_PARAM}/team`,
  chat: `${ORG_PATH}/${ORG_ID_PARAM}/chat`,
} as const

export const getMainOrgPathFor = (orgId: string): string =>
  organisationRoutes.index.replace(ORG_ID_PARAM, orgId)
