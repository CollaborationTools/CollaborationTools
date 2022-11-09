import type { InviteLink, SpaceId } from 'core/space'

const INVITE_LINK_ENCODED_DATA = ':data' as const

export const visitorRoutes = {
  getStarted: 'get-started',
  guide: 'guide',
  guideJoinSpace: '/guide/joining-space',
  invite: `/invite-${INVITE_LINK_ENCODED_DATA}`,
  tools: 'tools',
} as const

export const createInviteLink = (encodedData: string): InviteLink =>
  location.origin +
  visitorRoutes.invite.replace(INVITE_LINK_ENCODED_DATA, encodedData)

export const SPACE_PATH = '/space' as const
export const SPACE_ID_PARAM = ':id' as const

export const spaceRoutes = {
  all: `${SPACE_PATH}`,
  new: `${SPACE_PATH}/new`,
  index: `${SPACE_PATH}/${SPACE_ID_PARAM}`,
  team: `${SPACE_PATH}/${SPACE_ID_PARAM}/team`,
  chat: `${SPACE_PATH}/${SPACE_ID_PARAM}/chat`,
} as const

export const getMainSpacePathFor = (spaceId: SpaceId): string =>
  spaceRoutes.index.replace(SPACE_ID_PARAM, spaceId)
